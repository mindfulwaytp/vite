import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";

const EMOJIS = ["👍", "✅", "❤️"];

export default function PostDetail() {
  const { postId } = useParams();
  const { user, profile } = useAuthUser();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [acked, setAcked] = useState(false);
  const [ackCount, setAckCount] = useState(0);

  const [myReaction, setMyReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({});

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const canSee = useMemo(() => {
    const role = profile?.role;
    return (aud) => Array.isArray(aud) && (aud.includes("all") || (role ? aud.includes(role) : false));
  }, [profile?.role]);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!postId || !user) return;

      setLoading(true);

      try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
          if (alive) {
            setPost(null);
            setLoading(false);
          }
          return;
        }

        const p = postSnap.data();

        // UI guard (rules should prevent access anyway)
        if (!canSee(p.audience)) {
          if (alive) {
            setPost(null);
            setLoading(false);
          }
          return;
        }

        // ack status + count
        const ackRef = doc(db, "posts", postId, "acks", user.uid);
        const ackSnap = await getDoc(ackRef);
        const acksSnap = await getDocs(collection(db, "posts", postId, "acks"));

        // reactions status + counts
        const myReactRef = doc(db, "posts", postId, "reactions", user.uid);
        const myReactSnap = await getDoc(myReactRef);
        const reactsSnap = await getDocs(collection(db, "posts", postId, "reactions"));

        const counts = {};
        reactsSnap.forEach((d) => {
          const emoji = d.data()?.emoji;
          if (!emoji) return;
          counts[emoji] = (counts[emoji] || 0) + 1;
        });

        // comments
        const commentsQ = query(
          collection(db, "posts", postId, "comments"),
          orderBy("createdAt", "asc")
        );
        const commentsSnap = await getDocs(commentsQ);
        const commentList = commentsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        if (!alive) return;

        setPost(p);
        setAcked(ackSnap.exists());
        setAckCount(acksSnap.size);

        setMyReaction(myReactSnap.exists() ? myReactSnap.data()?.emoji : null);
        setReactionCounts(counts);

        setComments(commentList);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load post detail:", err);
        if (alive) {
          setPost(null);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [postId, user, canSee]);

  async function acknowledge() {
    if (!postId || !user) return;
    const ackRef = doc(db, "posts", postId, "acks", user.uid);

    // If they click twice quickly, avoid double-increment in UI
    if (acked) return;

    await setDoc(ackRef, { createdAt: serverTimestamp() }, { merge: true });
    setAcked(true);
    setAckCount((c) => c + 1);
  }

  async function toggleReaction(emoji) {
    if (!postId || !user) return;

    const rRef = doc(db, "posts", postId, "reactions", user.uid);

    if (myReaction === emoji) {
      await deleteDoc(rRef);
      setMyReaction(null);
      setReactionCounts((prev) => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) - 1),
      }));
      return;
    }

    // optimistic UI update
    setReactionCounts((prev) => {
      const next = { ...prev };

      if (myReaction) {
        next[myReaction] = Math.max(0, (next[myReaction] || 0) - 1);
      }
      next[emoji] = (next[emoji] || 0) + 1;

      return next;
    });

    await setDoc(rRef, { emoji, createdAt: serverTimestamp() }, { merge: true });
    setMyReaction(emoji);
  }

  async function addCommentHandler() {
    if (!postId || !user) return;
    const text = newComment.trim();
    if (!text) return;

    const cRef = collection(db, "posts", postId, "comments");
    const docRef = await addDoc(cRef, {
      text,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
    });

    // optimistic append
    setComments((prev) => [...prev, { id: docRef.id, text, createdBy: user.uid }]);
    setNewComment("");
  }

  if (loading) return <div>Loading…</div>;

  if (!post) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <p className="text-gray-700">Post not found or you don’t have access.</p>
        <Link className="text-sky-700 hover:underline" to="/intranet">
          Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <Link className="text-sky-700 hover:underline" to="/intranet">
          ← Back
        </Link>

        <h1 className="text-2xl font-semibold mt-3">{post.title}</h1>
        <p className="text-gray-800 mt-3 whitespace-pre-wrap">{post.body}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!acked ? (
            <button
              onClick={acknowledge}
              className="rounded-lg bg-sky-700 text-white px-4 py-2 hover:bg-sky-800"
            >
              Acknowledge
            </button>
          ) : (
            <span className="text-sm rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2">
              Acknowledged
            </span>
          )}

          <span className="text-sm text-gray-600">
            Acknowledged by <b>{ackCount}</b>
          </span>
        </div>

        <div className="mt-5 flex gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => toggleReaction(e)}
              className={`rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50 ${
                myReaction === e ? "bg-gray-900 text-white" : ""
              }`}
            >
              {e} {reactionCounts[e] || 0}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold">Comments</h2>

        <div className="mt-4 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border rounded-xl p-3">
              <div className="text-xs text-gray-500">User: {c.createdBy}</div>
              <div className="text-gray-800 mt-1 whitespace-pre-wrap">{c.text}</div>
            </div>
          ))}
          {comments.length === 0 && <div className="text-gray-600">No comments yet.</div>}
        </div>

        <div className="mt-5 flex gap-2">
          <textarea
            className="w-full border rounded-xl p-2 min-h-[80px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment…"
          />
          <button
            onClick={addCommentHandler}
            className="h-fit rounded-lg bg-gray-900 text-white px-4 py-2"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
