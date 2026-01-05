import {
  Navigate,
  Outlet,
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";

export default function IntranetLayout() {
  const { user, profile, loading, profileLoading } = useAuthUser();
  const navigate = useNavigate();
  /* 🔍 Global search input state */
const [query, setQuery] = useState("");


  /* 🔐 Auth guards */
  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profileLoading) {
    return <div className="p-6">Loading profile…</div>;
  }

  if (!profile) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-xl bg-white rounded-2xl shadow p-6">
          <h1 className="text-xl font-semibold">
            Access not configured
          </h1>
          <p className="mt-2 text-gray-700">
            Your account exists, but your staff profile record
            is missing.
          </p>
          <p className="mt-2 text-gray-700">
            Create a Firestore document at{" "}
            <code className="bg-gray-100 px-1 rounded">
              users/{user.uid}
            </code>
            .
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
          <h1 className="text-xl font-semibold">
            Account inactive
          </h1>
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

  /* ✅ MAIN LAYOUT */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LEFT NAV */}
          <nav className="flex items-center gap-6">
            <NavLink
              to="/intranet"
              end
              className={({ isActive }) =>
                `text-md ${
                  isActive
                    ? "font-semibold text-sky-700 underline"
                    : "hover:underline"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/intranet/resources"
              className={({ isActive }) =>
                `text-md ${
                  isActive
                    ? "font-semibold text-sky-700 underline"
                    : "hover:underline"
                }`
              }
            >
              Resources
            </NavLink>

            <NavLink
              to="/intranet/links"
              className={({ isActive }) =>
                `text-md ${
                  isActive
                    ? "font-semibold text-sky-700 underline"
                    : "hover:underline"
                }`
              }
            >
              Links
            </NavLink>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {profile.displayName} · {profile.role}
            </span>

            <button
              onClick={() => signOut(auth)}
              className="text-sm rounded-lg px-3 py-1.5 border hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>

    {/* 🔍 GLOBAL SEARCH BAR (SUBMIT-BASED) */}
    <div className="border-t bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            if (!q) return;
            navigate(`/intranet/search?q=${encodeURIComponent(q)}`);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Search posts, resources, or links…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-sky-700 text-white hover:bg-sky-800"
          >
            Search
          </button>
        </form>
      </div>
    </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet context={{ profile }} />
      </main>
    </div>
  );
}
