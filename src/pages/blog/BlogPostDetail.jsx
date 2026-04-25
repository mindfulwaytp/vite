import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  query as fsQuery,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";
import { excerptFromHtml, formatDate, sanitizeHtml } from "../../lib/blog";
import SEO from "../../components/SEO";

function toIso(value) {
  if (!value) return undefined;
  const d = value?.toDate ? value.toDate() : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export default function BlogPostDetail() {
  const { slug } = useParams();
  const { profile } = useAuthUser();
  const isAdmin = profile?.role === "admin";

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setNotFound(false);
      try {
        const ref = collection(db, "blogPosts");
        const q = isAdmin
          ? fsQuery(ref, where("slug", "==", slug), limit(1))
          : fsQuery(
              ref,
              where("slug", "==", slug),
              where("published", "==", true),
              limit(1)
            );
        const snap = await getDocs(q);
        if (!alive) return;
        if (snap.empty) {
          setNotFound(true);
          setPost(null);
        } else {
          const d = snap.docs[0];
          setPost({ id: d.id, ...d.data() });
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [slug, isAdmin]);

  if (loading) {
    return (
      <div className="bg-[#f3f6f9] min-h-screen pt-32 px-6 text-gray-600">
        <div className="max-w-3xl mx-auto">Loading…</div>
      </div>
    );
  }

  const hidden = post && !post.published && !isAdmin;

  if (notFound || hidden) {
    return (
      <div className="bg-[#f3f6f9] min-h-screen pt-32 px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Post not found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find that blog post. It may have been moved or unpublished.
          </p>
          <Link
            to="/blog"
            className="inline-block rounded-lg bg-sky-700 text-white px-5 py-2 hover:bg-sky-800"
          >
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const cleanHtml = sanitizeHtml(post.body);
  const description = post.excerpt || excerptFromHtml(post.body, 200);
  const publishedIso = toIso(post.publishedAt);
  const modifiedIso = toIso(post.updatedAt) || publishedIso;
  const canonical = `/blog/${post.slug}`;
  const baseUrl = "https://www.mindfulway-therapy.com";

  const jsonLd = post.published
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        datePublished: publishedIso,
        dateModified: modifiedIso,
        author: post.author
          ? { "@type": "Person", name: post.author }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: "Mindful Way Therapy",
          url: baseUrl,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}${canonical}`,
        },
        keywords: (post.tags || []).join(", ") || undefined,
      }
    : undefined;

  return (
    <div className="bg-[#f3f6f9] text-gray-800 min-h-screen">
      <SEO
        title={post.title}
        description={description}
        canonical={canonical}
        type="article"
        publishedTime={publishedIso}
        modifiedTime={modifiedIso}
        author={post.author}
        tags={post.tags || []}
        jsonLd={jsonLd}
      />

      <article className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-16">
        <div className="mb-6">
          <Link to="/blog" className="text-sm text-sky-700 hover:text-sky-900">
            ← Back to blog
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
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

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          {post.author && <span>{post.author}</span>}
          {post.author && post.publishedAt && <span className="mx-2">•</span>}
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {isAdmin && (
            <Link
              to={`/blog/edit/${post.id}`}
              className="ml-4 text-sky-700 hover:text-sky-900 underline"
            >
              Edit
            </Link>
          )}
        </div>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-sky-700 hover:prose-a:text-sky-900"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </article>

      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out to learn more about our services.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/contact"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/providers"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Meet Our Providers
          </Link>
        </div>
      </section>
    </div>
  );
}
