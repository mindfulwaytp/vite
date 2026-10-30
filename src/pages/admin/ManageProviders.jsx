import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import SEO from "../../components/SEO";
import { AVAILABILITY_OPTIONS, slugify } from "../../lib/providers";

const STATUS_STYLES = {
  yes: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "assessments only": "bg-sky-50 text-sky-800 border-sky-200",
  "starting soon": "bg-amber-50 text-amber-800 border-amber-200",
  no: "bg-gray-100 text-gray-700 border-gray-300",
};

function formatUpdated(provider) {
  const date = provider.updatedAt?.toDate?.();
  if (!date) return "";
  const when = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return provider.updatedBy ? `${when} · ${provider.updatedBy}` : when;
}

function ProviderRow({ provider, currentUser, onSaved }) {
  const current = (provider.acceptingClients || "").toLowerCase().trim();
  const [value, setValue] = useState(current);
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error

  // Keep a value the sheet had that isn't one of ours selectable, instead of
  // silently showing the wrong option.
  const options = AVAILABILITY_OPTIONS.some((o) => o.value === current) || !current
    ? AVAILABILITY_OPTIONS
    : [...AVAILABILITY_OPTIONS, { value: current, label: provider.acceptingClients }];

  async function handleChange(e) {
    const next = e.target.value;
    const previous = value;
    setValue(next);
    setStatus("saving");
    try {
      const updatedBy = currentUser.email || currentUser.uid;
      await updateDoc(doc(db, "providers", provider.id), {
        acceptingClients: next,
        updatedAt: serverTimestamp(),
        updatedBy,
      });
      onSaved(provider.id, { acceptingClients: next, updatedAt: { toDate: () => new Date() }, updatedBy });
      setStatus("saved");
    } catch (err) {
      console.error("Could not save availability:", err);
      setValue(previous);
      setStatus("error");
    }
  }

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
      <div className="flex-1 min-w-0">
        <Link
          to={`/providers/${provider.id}`}
          className="font-semibold text-gray-900 hover:text-sky-700"
        >
          {provider.name}
        </Link>
        {provider.license && <span className="text-gray-500">, {provider.license}</span>}
        {provider.hidden && (
          <span className="ml-2 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs text-amber-800">
            Hidden
          </span>
        )}
        <Link
          to={`/admin/providers/${provider.id}`}
          className="ml-3 text-sm text-sky-700 hover:underline"
        >
          Edit profile
        </Link>
        <p className="text-xs text-gray-500 mt-0.5">
          {status === "saving" && "Saving…"}
          {status === "saved" && <span className="text-emerald-700">Saved. Live on the site now.</span>}
          {status === "error" && (
            <span className="text-red-700">Couldn’t save. Check your connection and try again.</span>
          )}
          {status === "idle" && formatUpdated(provider) && `Last changed ${formatUpdated(provider)}`}
        </p>
      </div>

      <label className="sr-only" htmlFor={`availability-${provider.id}`}>
        Availability for {provider.name}
      </label>
      <select
        id={`availability-${provider.id}`}
        value={value}
        onChange={handleChange}
        disabled={status === "saving"}
        className={`w-full sm:w-56 rounded-lg border px-3 py-2 text-sm font-medium ${
          STATUS_STYLES[value] || "bg-white text-gray-800 border-gray-300"
        }`}
      >
        {!value && <option value="">Not set</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </li>
  );
}

function AddProvider({ providers, currentUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const trimmed = name.trim().replace(/\s+/g, " ");
  const id = slugify(trimmed);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) return;
    setError("");
    setAdding(true);
    try {
      const ref = doc(db, "providers", id);
      const order = Math.max(-1, ...providers.map((p) => p.order ?? -1)) + 1;
      await runTransaction(db, async (tx) => {
        if ((await tx.get(ref)).exists()) throw new Error("exists");
        // Starts hidden so an empty profile never shows in the directory.
        tx.set(ref, {
          name: trimmed,
          order,
          hidden: true,
          acceptingClients: "no",
          updatedAt: serverTimestamp(),
          updatedBy: currentUser.email || currentUser.uid,
        });
      });
      navigate(`/admin/providers/${id}`);
    } catch (err) {
      console.error("Could not add provider:", err);
      setError(
        err.message === "exists"
          ? `There’s already a provider at /providers/${id}.`
          : "Couldn’t add the provider. Check your connection and try again."
      );
      setAdding(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 md:px-8 py-5 mb-6"
    >
      <label htmlFor="newProviderName" className="block font-semibold text-gray-900">
        Add a provider
      </label>
      <p className="text-sm text-gray-500 mt-0.5">
        Use their full name as it should appear on the site. It sets their profile’s web address
        {id ? <> (/providers/{id})</> : null} and can’t be changed later.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <input
          id="newProviderName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="First Last"
          autoComplete="off"
          className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2"
        />
        <button
          type="submit"
          disabled={!id || adding}
          className="rounded-lg bg-sky-700 text-white px-4 py-2 font-medium hover:bg-sky-800 disabled:opacity-50"
        >
          {adding ? "Adding…" : "Add provider"}
        </button>
      </div>
      {error && <p className="text-sm text-red-700 mt-2">{error}</p>}
    </form>
  );
}

export default function ManageProviders() {
  const { user, profile, loading, profileLoading } = useAuthUser();
  const isAdmin = profile?.isActive && profile.role === "admin";

  const [providers, setProviders] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    getDocs(query(collection(db, "providers"), orderBy("order")))
      .then((snap) => setProviders(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch((err) => {
        console.error("Could not load providers:", err);
        setLoadError(err);
      });
  }, [isAdmin]);

  if (loading) return <div className="pt-32 px-6 text-gray-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (profileLoading) return <div className="pt-32 px-6 text-gray-600">Loading profile…</div>;
  if (!isAdmin) return <Navigate to="/providers" replace />;

  function handleSaved(id, changes) {
    setProviders((list) => list.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }

  const listed = providers?.filter((p) => !p.hidden);
  const acceptingCount = listed?.filter((p) =>
    ["yes", "assessments only"].includes((p.acceptingClients || "").toLowerCase())
  ).length;

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen pb-16">
      <SEO title="Manage Providers" description="" />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Providers</h1>
            <p className="text-gray-600 mt-1">
              Availability saves as soon as you pick a new status and shows on the directory right
              away. Use Edit profile to change bios, specialties, insurance and the rest.
            </p>
          </div>
          <Link
            to="/providers"
            className="shrink-0 text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
          >
            View directory
          </Link>
        </div>

        {providers && <AddProvider providers={providers} currentUser={user} />}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 md:px-8 py-2">
          {loadError && (
            <p className="py-6 text-red-700">
              Couldn’t load providers ({loadError.code || loadError.message}).
            </p>
          )}
          {!loadError && !providers && <p className="py-6 text-gray-600">Loading providers…</p>}
          {providers && providers.length === 0 && (
            <p className="py-6 text-gray-600">
              No providers in the database yet. Run <code>npm run import-providers</code> to copy them
              from the sheet.
            </p>
          )}
          {providers && providers.length > 0 && (
            <>
              <p className="pt-4 text-sm text-gray-600">
                {acceptingCount} of {listed.length} listed providers currently accepting clients.
              </p>
              <ul className="divide-y divide-gray-100">
                {providers.map((p) => (
                  <ProviderRow key={p.id} provider={p} currentUser={user} onSaved={handleSaved} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
