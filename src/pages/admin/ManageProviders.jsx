import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import SEO from "../../components/SEO";

// Values the directory and profile pages know how to display (compared lowercase).
const AVAILABILITY_OPTIONS = [
  { value: "yes", label: "Accepting clients" },
  { value: "assessments only", label: "Assessments only" },
  { value: "starting soon", label: "Starting soon" },
  { value: "no", label: "Not accepting" },
];

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

  const acceptingCount = providers?.filter((p) =>
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
            <h1 className="text-3xl font-bold text-gray-900">Provider availability</h1>
            <p className="text-gray-600 mt-1">
              Changes save as soon as you pick a new status and show on the directory right away.
            </p>
          </div>
          <Link
            to="/providers"
            className="shrink-0 text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
          >
            View directory
          </Link>
        </div>

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
                {acceptingCount} of {providers.length} providers currently accepting clients.
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
