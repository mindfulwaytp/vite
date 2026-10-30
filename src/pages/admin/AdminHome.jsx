import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import SEO from "../../components/SEO";

const SECTIONS = [
  {
    to: "/admin/providers",
    title: "Providers",
    description: "Availability, profiles, and adding or removing providers.",
  },
  { to: "/blog/new", title: "Write a blog post", description: "Start a new post or draft." },
  { to: "/blog", title: "Blog posts", description: "Edit existing posts and drafts." },
];

export default function AdminHome() {
  const { user, profile, loading, profileLoading } = useAuthUser();
  const navigate = useNavigate();

  if (loading) return <div className="pt-32 px-6 text-gray-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (profileLoading) return <div className="pt-32 px-6 text-gray-600">Loading profile…</div>;

  const isAdmin = profile?.isActive && profile.role === "admin";

  async function handleSignOut() {
    await signOut(auth);
    navigate("/", { replace: true });
  }

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen pb-16">
      <SEO title="Admin" description="" />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
            <p className="text-gray-600 mt-1">Signed in as {user.email}.</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
          >
            Sign out
          </button>
        </div>

        {isAdmin ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="block h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-sky-300"
                >
                  <span className="block font-semibold text-gray-900">{s.title}</span>
                  <span className="block text-sm text-gray-600 mt-1">{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-700">
            This account doesn’t have admin access. Ask the practice owner to turn it on.
          </p>
        )}
      </div>
    </div>
  );
}
