import { useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";

const ROLE_OPTIONS = [
  { value: "all", label: "All staff" },
  { value: "admin", label: "Admins" },
  { value: "supervisor", label: "Supervisors" },
  { value: "clinician", label: "Clinicians" },
  { value: "intern", label: "Interns" },
  { value: "staff", label: "Staff (non-clinical)" },
];

export default function NewPost() {
  const { user, profile, loading, profileLoading } = useAuthUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pinned, setPinned] = useState(false);
  const [audience, setAudience] = useState(["all"]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = profile?.role === "admin";

  const canSubmit = useMemo(() => {
    return title.trim().length > 0 && body.trim().length > 0 && audience.length > 0;
  }, [title, body, audience]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  // wait for profile to load before gating
  if (profileLoading) return <div className="p-6">Loading profile…</div>;
  if (!profile || !profile.isActive) return <Navigate to="/intranet" replace />;

  // admin-only
  if (!isAdmin) return <Navigate to="/intranet" replace />;

  function toggleAudience(val) {
    setAudience((prev) => {
      if (prev.includes(val)) {
        const next = prev.filter((x) => x !== val);
        return next.length ? next : ["all"];
      }
      // if picking anything other than all, remove all unless explicitly kept
      if (val !== "all") {
        return prev.includes("all") ? [val] : [...prev, val];
      }
      // selecting all replaces other selections
      return ["all"];
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) return;

    setSaving(true);
    try {
      await addDoc(collection(db, "posts"), {
        title: title.trim(),
        body: body.trim(),
        pinned: Boolean(pinned),
        audience: audience,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });

      navigate("/intranet", { replace: true });
    } catch (err) {
      setError(err?.message ?? "Failed to create post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">New post</h1>
          <p className="text-gray-600 mt-1">
            Create an announcement for staff. Choose an audience and optionally pin it.
          </p>
        </div>
        <Link
          to="/intranet"
          className="text-sm rounded-lg px-3 py-1.5 border hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            className="mt-1 w-full border rounded-lg p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Policy reminder, meeting update…"
            maxLength={120}
            required
          />
          <div className="text-xs text-gray-500 mt-1">{title.length}/120</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            className="mt-1 w-full border rounded-lg p-2 min-h-[180px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the message staff should read…"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Audience</label>
            <div className="text-xs text-gray-500">
              “All staff” replaces other selections.
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ROLE_OPTIONS.map((opt) => {
              const checked = audience.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 rounded-xl border p-3 cursor-pointer hover:bg-gray-50 ${
                    checked ? "border-sky-300 bg-sky-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAudience(opt.value)}
                  />
                  <span className="text-sm text-gray-800">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="pinned"
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          <label htmlFor="pinned" className="text-sm text-gray-800">
            Pin this post to the top
          </label>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={saving || !canSubmit}
          className="rounded-lg bg-sky-700 text-white px-4 py-2 hover:bg-sky-800 disabled:opacity-60"
        >
          {saving ? "Publishing…" : "Publish post"}
        </button>
      </form>
    </div>
  );
}
