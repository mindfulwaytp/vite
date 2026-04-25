import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query as fsQuery,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { slugify, excerptFromHtml } from "../../lib/blog";
import RichTextEditor from "./RichTextEditor";

export default function BlogPostForm({ initialPost = null, postId = null, currentUser, defaultAuthor = "" }) {
  const isEdit = Boolean(postId);
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.slug));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [body, setBody] = useState(initialPost?.body || "");
  const [author, setAuthor] = useState(initialPost?.author || defaultAuthor);
  const [tags, setTags] = useState(initialPost?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  function addTagFromInput() {
    const value = tagInput.trim().toLowerCase();
    if (!value) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags([...tags, value]);
    setTagInput("");
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTagFromInput();
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function ensureUniqueSlug(desiredSlug) {
    const q = fsQuery(collection(db, "blogPosts"), where("slug", "==", desiredSlug));
    const snap = await getDocs(q);
    const conflict = snap.docs.find((d) => d.id !== postId);
    if (!conflict) return desiredSlug;

    let counter = 2;
    while (true) {
      const candidate = `${desiredSlug}-${counter}`;
      const q2 = fsQuery(collection(db, "blogPosts"), where("slug", "==", candidate));
      const snap2 = await getDocs(q2);
      const conflict2 = snap2.docs.find((d) => d.id !== postId);
      if (!conflict2) return candidate;
      counter += 1;
      if (counter > 50) throw new Error("Could not generate a unique slug");
    }
  }

  async function save({ publish }) {
    setError(null);

    if (!title.trim()) return setError("Title is required");
    if (!body.trim() || body === "<p></p>") return setError("Body is required");
    if (!author.trim()) return setError("Author is required");

    setSaving(true);
    try {
      const desiredSlug = slugify(slug || title);
      if (!desiredSlug) throw new Error("Could not generate a URL slug from the title");

      const finalSlug = await ensureUniqueSlug(desiredSlug);

      const computedExcerpt = excerpt.trim() || excerptFromHtml(body, 200);

      if (isEdit) {
        const ref = doc(db, "blogPosts", postId);
        const wasPublished = Boolean(initialPost?.published);
        const updatePayload = {
          title: title.trim(),
          slug: finalSlug,
          excerpt: computedExcerpt,
          body,
          author: author.trim(),
          tags,
          published: publish,
          updatedAt: serverTimestamp(),
        };
        if (publish && !wasPublished) {
          updatePayload.publishedAt = serverTimestamp();
        }
        await updateDoc(ref, updatePayload);
        navigate(publish ? `/blog/${finalSlug}` : `/blog/edit/${postId}`, { replace: true });
      } else {
        const ref = doc(collection(db, "blogPosts"));
        await setDoc(ref, {
          title: title.trim(),
          slug: finalSlug,
          excerpt: computedExcerpt,
          body,
          author: author.trim(),
          tags,
          published: publish,
          publishedAt: publish ? serverTimestamp() : null,
          createdBy: currentUser?.uid || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        navigate(publish ? `/blog/${finalSlug}` : `/blog/edit/${ref.id}`, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          maxLength={140}
          required
        />
        <div className="text-xs text-gray-500 mt-1">{title.length}/140</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL slug</label>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-gray-500 text-sm">/blog/</span>
          <input
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            onBlur={() => setSlug((s) => slugify(s))}
            placeholder="auto-generated-from-title"
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Auto-generated from title; edit to override. Must be unique.
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g., Ryne Evans, MA, LMFT"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Excerpt <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          className="mt-1 w-full border border-gray-300 rounded-lg p-2 min-h-[70px] focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short teaser shown on the listing page. Auto-generated from body if left blank."
          maxLength={300}
        />
        <div className="text-xs text-gray-500 mt-1">{excerpt.length}/300</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags / Categories</label>
        <div className="mt-1 flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-sm px-2 py-1 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-sky-700 hover:text-sky-900"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="flex-1 min-w-[120px] outline-none p-1"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={addTagFromInput}
            placeholder={tags.length ? "" : "Type a tag and press Enter"}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Press Enter or comma to add a tag. Tags are lowercase.
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-200">
        <button
          type="button"
          disabled={saving}
          onClick={() => save({ publish: false })}
          className="rounded-lg border border-gray-400 text-gray-800 px-5 py-2 hover:border-sky-500 hover:text-sky-700 transition disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => save({ publish: true })}
          className="rounded-lg bg-sky-700 text-white px-5 py-2 hover:bg-sky-800 disabled:opacity-60"
        >
          {saving ? "Publishing…" : initialPost?.published ? "Update published post" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/blog")}
          className="text-gray-600 hover:text-gray-800 px-3 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
