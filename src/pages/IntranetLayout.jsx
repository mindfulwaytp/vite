import { Navigate, Outlet, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthUser } from "../hooks/useAuthUser";

export default function IntranetLayout() {
  const { user, profile, loading, profileLoading } = useAuthUser();

  if (loading) return <div className="p-6">Loading…</div>;

  // Not signed in → go login
  if (!user) return <Navigate to="/login" replace />;

  // Signed in but no profile doc (or inactive) → hard stop
  if (profileLoading) return <div className="p-6">Loading profile…</div>;
  if (!profile) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-xl bg-white rounded-2xl shadow p-6">
          <h1 className="text-xl font-semibold">Access not configured</h1>
          <p className="mt-2 text-gray-700">
            Your account exists, but your staff profile record is missing.
          </p>
          <p className="mt-2 text-gray-700">
            Create a Firestore document at <code className="bg-gray-100 px-1 rounded">users/{user.uid}</code>.
          </p>
          <button
            className="mt-4 rounded-lg bg-gray-900 text-white px-4 py-2"
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  if (!profile.isActive) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-xl bg-white rounded-2xl shadow p-6">
          <h1 className="text-xl font-semibold">Account inactive</h1>
          <p className="mt-2 text-gray-700">
            Your staff account is currently inactive.
          </p>
          <button
            className="mt-4 rounded-lg bg-gray-900 text-white px-4 py-2"
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/intranet" className="font-semibold text-sky-800">
              Staff Intranet
            </Link>
            <span className="text-sm text-gray-500">
              {profile.displayName} • {profile.role}
            </span>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="text-sm rounded-lg px-3 py-1.5 border hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
