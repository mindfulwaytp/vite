import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import BlogPostForm from "../../components/blog/BlogPostForm";
import SEO from "../../components/SEO";

export default function EditBlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile, loading, profileLoading } = useAuthUser();

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      setPostLoading(true);
      try {
        const ref = doc(db, "blogPosts", id);
        const snap = await getDoc(ref);
        if (!alive) return;
        if (!snap.exists()) {
          setNotFound(true);
        } else {
          setPost({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setNotFound(true);
      } finally {
        if (alive) setPostLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this post permanently? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "blogPosts", id));
      navigate("/blog", { replace: true });
    } catch (err) {
      alert(err?.message || "Failed to delete post");
      setDeleting(false);
    }
  }

  if (loading) return <div className="pt-32 px-6 text-gray-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (profileLoading) return <div className="pt-32 px-6 text-gray-600">Loading profile…</div>;
  if (!profile || !profile.isActive) return <Navigate to="/blog" replace />;
  if (profile.role !== "admin") return <Navigate to="/blog" replace />;

  if (postLoading) return <div className="pt-32 px-6 text-gray-600">Loading post…</div>;
  if (notFound)
    return (
      <div className="pt-32 px-6 max-w-3xl mx-auto text-gray-600">
        Post not found.{" "}
        <Link to="/blog" className="text-sky-700 underline">
          Back to blog
        </Link>
      </div>
    );

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen pb-16">
      <SEO title="Edit Post | Mindful Way Blog" description="" />

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit post</h1>
            <p className="text-gray-600 mt-1">
              {post.published ? "Currently published." : "Currently saved as draft."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {post.published && (
              <Link
                to={`/blog/${post.slug}`}
                className="text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
              >
                View live
              </Link>
            )}
            <Link
              to="/blog"
              className="text-sm rounded-lg px-3 py-1.5 border border-gray-300 hover:bg-white"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <BlogPostForm initialPost={post} postId={id} currentUser={user} />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-red-600 hover:text-red-800 underline disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete this post"}
          </button>
        </div>
      </div>
    </div>
  );
}
