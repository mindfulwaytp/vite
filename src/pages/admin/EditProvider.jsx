import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import { AVAILABILITY_OPTIONS, fetchProviders } from "../../lib/providers";
import SEO from "../../components/SEO";

const TEXT_FIELDS = ["license", "pronouns", "acceptingClients", "psychologyTodayLink", "bioIntro", "bioBody"];

// Directory filters match these values exactly, so each list offers every value any
// provider already uses; picking from it keeps spellings consistent.
const LIST_FIELDS = [
  { key: "location", label: "Locations" },
  { key: "services", label: "Services" },
  { key: "insurance", label: "Insurance" },
  { key: "gender", label: "Gender", hint: "Used by the directory's gender filter." },
  {
    key: "topSpecialties",
    label: "Top specialties",
    hint: "Shown first on the profile, above the full list.",
    vocabularyFrom: ["topSpecialties", "specialties"],
  },
  { key: "specialties", label: "All specialties" },
  { key: "modalities", label: "Modalities" },
];

// Firestore keeps list fields as comma-separated strings, the same shape the sheet used.
const toStored = (list) => list.join(", ");

function formFromProvider(provider) {
  const form = {};
  for (const key of TEXT_FIELDS) form[key] = provider[key] || "";
  for (const { key } of LIST_FIELDS) form[key] = [...provider[key]];
  form.hidden = Boolean(provider.hidden);
  return form;
}

function storedValues(form) {
  const values = { hidden: form.hidden };
  for (const key of TEXT_FIELDS) values[key] = form[key].trim();
  for (const { key } of LIST_FIELDS) values[key] = toStored(form[key]);
  return values;
}

function ListField({ field, options, selected, onChange }) {
  const [draft, setDraft] = useState("");
  const choices = [...new Set([...options, ...selected])].sort((a, b) => a.localeCompare(b));

  function toggle(value) {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  }

  function addDraft() {
    // A comma would split the value in storage, so treat it as a separator here too.
    const added = draft.split(",").map((s) => s.trim()).filter((s) => s && !selected.includes(s));
    if (added.length) onChange([...selected, ...added]);
    setDraft("");
  }

  return (
    <fieldset className="py-5">
      <legend className="font-semibold text-gray-900">{field.label}</legend>
      {field.hint && <p className="text-sm text-gray-500 mt-0.5">{field.hint}</p>}
      <div className="flex flex-wrap gap-2 mt-3">
        {choices.map((value) => {
          const on = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(value)}
              className={`rounded-full border px-3 py-1 text-sm ${
                on
                  ? "bg-sky-700 border-sky-700 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 mt-3">
        <label className="sr-only" htmlFor={`add-${field.key}`}>
          Add to {field.label}
        </label>
        <input
          id={`add-${field.key}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addDraft();
            }
          }}
          placeholder="Add one that isn't listed"
          className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        />
        <button
          type="button"
          onClick={addDraft}
          disabled={!draft.trim()}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </fieldset>
  );
}

function TextInput({ id, label, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-gray-900">
        {label}
      </label>
      {hint && <p className="text-sm text-gray-500 mt-0.5">{hint}</p>}
      <input id={id} {...props} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" />
    </div>
  );
}

export default function EditProvider() {
  const { id } = useParams();
  const { user, profile, loading, profileLoading } = useAuthUser();
  const isAdmin = profile?.isActive && profile.role === "admin";

  const [providers, setProviders] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(null); // stored values as of the last load or save
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [confirmName, setConfirmName] = useState("");
  const [removeStatus, setRemoveStatus] = useState("idle"); // idle | removing | error
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) return;
    fetchProviders({ includeHidden: true })
      .then((list) => {
        setProviders(list);
        const provider = list.find((p) => p.id === id);
        if (!provider) return;
        const initial = formFromProvider(provider);
        setForm(initial);
        setSaved(storedValues(initial));
      })
      .catch((err) => {
        console.error("Could not load providers:", err);
        setLoadError(err);
      });
  }, [isAdmin, id]);

  const vocabulary = useMemo(() => {
    const vocab = {};
    for (const field of LIST_FIELDS) {
      const sources = field.vocabularyFrom || [field.key];
      vocab[field.key] = [...new Set((providers || []).flatMap((p) => sources.flatMap((s) => p[s])))];
    }
    return vocab;
  }, [providers]);

  // Only the fields that differ from what's stored, so saving a bio can't undo an
  // availability change someone made on the list page in the meantime.
  const changes = useMemo(() => {
    if (!form || !saved) return {};
    const current = storedValues(form);
    return Object.fromEntries(Object.entries(current).filter(([key, value]) => value !== saved[key]));
  }, [form, saved]);
  const dirty = Object.keys(changes).length > 0;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (loading) return <div className="pt-32 px-6 text-gray-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (profileLoading) return <div className="pt-32 px-6 text-gray-600">Loading profile…</div>;
  if (!isAdmin) return <Navigate to="/providers" replace />;

  const provider = providers?.find((p) => p.id === id);
  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setStatus("idle");
  };
  const setText = (key) => (e) => set(key)(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!dirty) return;
    setStatus("saving");
    try {
      await updateDoc(doc(db, "providers", id), {
        ...changes,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || user.uid,
      });
      setSaved((s) => ({ ...s, ...changes }));
      setStatus("saved");
    } catch (err) {
      console.error("Could not save profile:", err);
      setStatus("error");
    }
  }

  async function handleRemove() {
    setRemoveStatus("removing");
    try {
      await deleteDoc(doc(db, "providers", id));
      navigate("/admin/providers", { replace: true });
    } catch (err) {
      console.error("Could not remove provider:", err);
      setRemoveStatus("error");
    }
  }

  const availabilityOptions =
    !form || !form.acceptingClients || AVAILABILITY_OPTIONS.some((o) => o.value === form.acceptingClients.toLowerCase())
      ? AVAILABILITY_OPTIONS
      : [...AVAILABILITY_OPTIONS, { value: form.acceptingClients, label: form.acceptingClients }];

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen pb-28">
      <SEO title={provider ? `Edit ${provider.name}` : "Edit Provider"} description="" />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32">
        <Link to="/admin/providers" className="text-sm text-sky-700 hover:underline">
          ← All providers
        </Link>

        {loadError && (
          <p className="mt-6 text-red-700">Couldn’t load providers ({loadError.code || loadError.message}).</p>
        )}
        {!loadError && !providers && <p className="mt-6 text-gray-600">Loading provider…</p>}
        {providers && !provider && <p className="mt-6 text-gray-600">No provider with the id “{id}”.</p>}

        {provider && form && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-start justify-between gap-4 mt-3 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  The name sets the profile’s web address and photo, so it can’t be changed here.
                </p>
              </div>
              <Link
                to={`/providers/${id}`}
                className="shrink-0 text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
              >
                View profile
              </Link>
            </div>

            <label
              className={`flex items-start gap-3 rounded-2xl border px-6 md:px-8 py-4 mb-6 ${
                form.hidden ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={!form.hidden}
                onChange={(e) => set("hidden")(!e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                <span className="block font-semibold text-gray-900">Show on the site</span>
                <span className="block text-sm text-gray-600">
                  {form.hidden
                    ? "Hidden from the directory and has no public profile. Fill in the profile, then check this and save."
                    : "Listed in the directory with a public profile. Uncheck to hide without deleting anything."}
                </span>
              </span>
            </label>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 md:px-8 py-6 grid gap-5 sm:grid-cols-2">
              <TextInput id="license" label="License" value={form.license} onChange={setText("license")} />
              <TextInput id="pronouns" label="Pronouns" value={form.pronouns} onChange={setText("pronouns")} />
              <div>
                <label htmlFor="acceptingClients" className="block font-semibold text-gray-900">
                  Availability
                </label>
                <select
                  id="acceptingClients"
                  value={form.acceptingClients.toLowerCase()}
                  onChange={setText("acceptingClients")}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
                >
                  {!form.acceptingClients && <option value="">Not set</option>}
                  {availabilityOptions.map((o) => (
                    <option key={o.value} value={o.value.toLowerCase()}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <TextInput
                id="psychologyTodayLink"
                label="Psychology Today link"
                type="url"
                value={form.psychologyTodayLink}
                onChange={setText("psychologyTodayLink")}
              />
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 md:px-8 py-6 mt-6 space-y-5">
              <div>
                <label htmlFor="bioIntro" className="block font-semibold text-gray-900">
                  Short intro
                </label>
                <p className="text-sm text-gray-500 mt-0.5">
                  One or two sentences. Search engines show it under the profile link.
                </p>
                <textarea
                  id="bioIntro"
                  rows={3}
                  value={form.bioIntro}
                  onChange={setText("bioIntro")}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="bioBody" className="block font-semibold text-gray-900">
                  Bio
                </label>
                <p className="text-sm text-gray-500 mt-0.5">Leave a blank line between paragraphs.</p>
                <textarea
                  id="bioBody"
                  rows={16}
                  value={form.bioBody}
                  onChange={setText("bioBody")}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 leading-relaxed"
                />
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 md:px-8 py-1 mt-6 divide-y divide-gray-100">
              {LIST_FIELDS.map((field) => (
                <ListField
                  key={field.key}
                  field={field}
                  options={vocabulary[field.key]}
                  selected={form[field.key]}
                  onChange={set(field.key)}
                />
              ))}
            </section>

            <section className="rounded-2xl border border-red-200 bg-white px-6 md:px-8 py-6 mt-6">
              <h2 className="font-semibold text-gray-900">Remove provider</h2>
              <p className="text-sm text-gray-600 mt-1">
                Deletes {provider.name}’s profile for good. If they might come back, uncheck “Show on the
                site” instead.
              </p>
              <label htmlFor="confirmName" className="block text-sm text-gray-700 mt-4">
                Type <span className="font-semibold">{provider.name}</span> to confirm
              </label>
              <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <input
                  id="confirmName"
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  autoComplete="off"
                  className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={confirmName.trim() !== provider.name || removeStatus === "removing"}
                  className="rounded-lg bg-red-700 text-white px-4 py-2 font-medium hover:bg-red-800 disabled:opacity-50"
                >
                  {removeStatus === "removing" ? "Removing…" : "Remove provider"}
                </button>
              </div>
              {removeStatus === "error" && (
                <p className="text-sm text-red-700 mt-2">Couldn’t remove. Check your connection and try again.</p>
              )}
            </section>

            <div className="fixed inset-x-0 bottom-0 bg-white/95 border-t border-gray-200">
              <div className="max-w-3xl mx-auto px-6 md:px-8 py-3 flex items-center justify-end gap-4">
                <p className="text-sm text-gray-600 mr-auto">
                  {status === "saving" && "Saving…"}
                  {status === "saved" && <span className="text-emerald-700">Saved. Live on the site now.</span>}
                  {status === "error" && (
                    <span className="text-red-700">Couldn’t save. Check your connection and try again.</span>
                  )}
                  {status === "idle" && dirty && "Unsaved changes"}
                </p>
                <button
                  type="submit"
                  disabled={!dirty || status === "saving"}
                  className="rounded-lg bg-sky-700 text-white px-5 py-2 font-medium hover:bg-sky-800 disabled:opacity-50"
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
