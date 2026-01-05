import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  const { user, profile, profileLoading } = useAuthUser();
  const navigate = useNavigate();

  const isAdmin = profile?.role === "admin";

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [acked, setAcked] = useState(false);
  const [ackCount, setAckCount] = useState(0);

  const [myReaction, setMyReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({});

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [ackUsers, setAckUsers] = useState([]);
  const [showAckUsers, setShowAckUsers] = useState(false);

  const canSee = useMemo(() => {
    const role = profile?.role;

    return (aud) => {
      if (!aud) return true;
      const audience = Array.isArray(aud) ? aud : [aud];
      if (audience.includes("all")) return true;
      if (role && audience.includes(role)) return true;
      return false;
    };
  }, [profile?.role]);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!postId || !user || profileLoading) return;

      setLoading(true);

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

      if (!canSee(p.audience)) {
        if (alive) {
          setPost(null);
          setLoading(false);
        }
        return;
      }

      // ---- ACKS ----
      let ackSnap, acksSnap;
      try {
        const ackRef = doc(db, "posts", postId, "acks", user.uid);
        ackSnap = await getDoc(ackRef);
        acksSnap = await getDocs(collection(db, "posts", postId, "acks"));
      } catch (e) {
        console.error("ACKS FAILED:", e);
      }

      // ---- LOAD ACKNOWLEDGED USERS (ADMIN ONLY) ----
      if (isAdmin && acksSnap?.docs?.length) {
        try {
          const usersSnap = await Promise.all(
            acksSnap.docs.map((d) =>
              getDoc(doc(db, "users", d.id))
            )
          );

          const users = usersSnap
            .filter((u) => u.exists())
            .map((u) => ({
              id: u.id,
              displayName: u.data().displayName || "Unnamed user",
              role: u.data().role,
            }));

          setAckUsers(users);
        } catch (e) {
          console.error("Failed to load acknowledged users:", e);
        }
      }

      // ---- REACTIONS ----
      let reactsSnap;
      try {
        reactsSnap = await getDocs(
          collection(db, "posts", postId, "reactions")
        );
      } catch (e) {
        console.error("REACTIONS FAILED:", e);
      }

      // ---- COMMENTS ----
      let commentsSnap;
      try {
        commentsSnap = await getDocs(
          query(
            collection(db, "posts", postId, "comments"),
            orderBy("createdAt", "asc")
          )
        );
      } catch (e) {
        console.error("COMMENTS FAILED:", e);
      }

      if (!alive) return;

      setPost(p);
      setAcked(ackSnap?.exists() ?? false);
      setAckCount(acksSnap?.size ?? 0);

      const counts = {};
      reactsSnap?.forEach((d) => {
        const emoji = d.data()?.emoji;
        if (emoji) counts[emoji] = (counts[emoji] || 0) + 1;
      });
      setReactionCounts(counts);

      setComments(
        commentsSnap?.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) ?? []
      );

      setLoading(false);
    }

    load();

    return () => {
      alive = false;
    };
  }, [postId, user, profileLoading, canSee, isAdmin]);

  async function acknowledge() {
    if (!postId || !user || acked) return;

    const ackRef = doc(db, "posts", postId, "acks", user.uid);
    await setDoc(ackRef, { createdAt: serverTimestamp() }, { merge: true });

    setAcked(true);
    setAckCount((c) => c + 1);
  }

  async function handleDeletePost() {
    if (!postId || !isAdmin) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?\n\nThis cannot be undone."
    );

    if (!confirmed) return;

    await deleteDoc(doc(db, "posts", postId));
    navigate("/intranet");
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

    setReactionCounts((prev) => {
      const next = { ...prev };
      if (myReaction) next[myReaction]--;
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

    setComments((prev) => [...prev, { id: docRef.id, text, createdBy: user.uid }]);
    setNewComment("");
  }

  if (loading) return <div>Loading…</div>;

  if (!post) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <p className="text-gray-700">Post not found or you don’t have access.</p>
        <Link to="/intranet" className="text-sky-700 hover:underline">
          Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <Link to="/intranet" className="text-sky-700 hover:underline">
            ← Back
          </Link>

          {isAdmin && (
            <button
              onClick={handleDeletePost}
              className="text-sm text-red-600 hover:underline"
            >
              Delete post
            </button>
          )}
        </div>

        <h1 className="text-2xl font-semibold mt-3">{post.title}</h1>
        <p className="text-gray-800 mt-3 whitespace-pre-wrap">{post.body}</p>

        <div className="mt-6 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
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

            {isAdmin && ackUsers.length > 0 && (
              <button
                onClick={() => setShowAckUsers((v) => !v)}
                className="text-sm text-sky-700 hover:underline"
              >
                {showAckUsers ? "Hide" : "View"} acknowledgements
              </button>
            )}
          </div>

          {isAdmin && showAckUsers && (
            <div className="border rounded-lg bg-gray-50 p-3 space-y-1 max-w-md">
              {ackUsers.map((u) => (
                <div
                  key={u.id}
                  className="text-sm text-gray-800 flex justify-between"
                >
                  <span>{u.displayName}</span>
                  <span className="text-xs text-gray-500">{u.role}</span>
                </div>
              ))}
            </div>
          )}
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
              <div className="text-gray-800 mt-1 whitespace-pre-wrap">
                {c.text}
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-gray-600">No comments yet.</div>
          )}
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
