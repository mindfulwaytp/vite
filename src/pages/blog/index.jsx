import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as fsQuery,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import { formatDate } from "../../lib/blog";
import SEO from "../../components/SEO";

export default function BlogIndex() {
  const { profile } = useAuthUser();
  const isAdmin = profile?.role === "admin";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const ref = collection(db, "blogPosts");
        const q = isAdmin
          ? fsQuery(ref, orderBy("createdAt", "desc"), limit(100))
          : fsQuery(
              ref,
              where("published", "==", true),
              orderBy("publishedAt", "desc"),
              limit(100)
            );
        const snap = await getDocs(q);
        if (!alive) return;
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [isAdmin]);

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => (p.tags || []).includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen">
      <SEO
        title="Blog | Mindful Way Therapy"
        description="Reflections, resources, and updates on neurodivergent and LGBTQ+ affirming therapy from the Mindful Way Therapy team."
        canonical="/blog"
      />

      {/* Hero */}
      <section className="mt-20 bg-brand-100 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            From the Mindful Way Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Reflections, resources, and updates from our therapists on neurodivergent
            and LGBTQ+ affirming care.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {isAdmin && (
          <div className="mb-8 flex justify-end">
            <Link
              to="/blog/new"
              className="inline-flex items-center rounded-lg bg-sky-700 text-white px-4 py-2 hover:bg-sky-800"
            >
              + New post
            </Link>
          </div>
        )}

        {allTags.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 mr-1">Filter:</span>
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`text-sm px-3 py-1 rounded-full border transition ${
                activeTag === null
                  ? "bg-sky-700 text-white border-sky-700"
                  : "bg-white text-gray-700 border-gray-300 hover:border-sky-500 hover:text-sky-700"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition ${
                  activeTag === tag
                    ? "bg-sky-700 text-white border-sky-700"
                    : "bg-white text-gray-700 border-gray-300 hover:border-sky-500 hover:text-sky-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-gray-600">Loading posts…</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-gray-600 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            {posts.length === 0
              ? "No blog posts yet. Check back soon!"
              : "No posts match this tag."}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-sky-200 transition"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {!post.published && (
                    <span className="text-xs uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Draft
                    </span>
                  )}
                  {(post.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-sky-700 mb-2 leading-tight">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="text-sm text-gray-500">
                  {post.author && <span>{post.author}</span>}
                  {post.author && post.publishedAt && <span className="mx-2">•</span>}
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
