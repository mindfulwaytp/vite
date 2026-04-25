import { Link, Navigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import BlogPostForm from "../../components/blog/BlogPostForm";
import SEO from "../../components/SEO";

export default function NewBlogPost() {
  const { user, profile, loading, profileLoading } = useAuthUser();

  if (loading) return <div className="pt-32 px-6 text-gray-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (profileLoading) return <div className="pt-32 px-6 text-gray-600">Loading profile…</div>;
  if (!profile || !profile.isActive) return <Navigate to="/blog" replace />;
  if (profile.role !== "admin") return <Navigate to="/blog" replace />;

  const defaultAuthor = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "";

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen pb-16">
      <SEO title="New Post | Mindful Way Blog" description="" />

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New blog post</h1>
            <p className="text-gray-600 mt-1">
              Save as draft to keep editing, or publish to make it live at /blog.
            </p>
          </div>
          <Link
            to="/blog"
            className="text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
          >
            Cancel
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <BlogPostForm currentUser={user} defaultAuthor={defaultAuthor} />
        </div>
      </div>
    </div>
  );
}
