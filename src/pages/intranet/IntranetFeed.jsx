import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query, where, limit } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../lib/firebase";
import { useAuthUser } from "../../hooks/useAuthUser";

function truncate(s, n = 160) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trim() + "…" : s;
}

export default function IntranetFeed() {
  const { profile } = useAuthUser();
  const [pinned, setPinned] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const myRole = profile?.role;

  const canSee = useMemo(() => {
    return (aud) => Array.isArray(aud) && (aud.includes("all") || (myRole ? aud.includes(myRole) : false));
  }, [myRole]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const postsRef = collection(db, "posts");

      const pinnedQ = query(
        postsRef,
        where("pinned", "==", true),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      const recentQ = query(
        postsRef,
        where("pinned", "==", false),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const [pSnap, rSnap] = await Promise.all([getDocs(pinnedQ), getDocs(recentQ)]);
      if (!alive) return;

      const pinnedPosts = pSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const recentPosts = rSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Client-side filter (rules already enforce server-side access; this just keeps UI clean)
      setPinned(pinnedPosts.filter((p) => canSee(p.audience)));
      setRecent(recentPosts.filter((p) => canSee(p.audience)));

      setLoading(false);
    }

    load().catch((err) => {
      console.error("Failed to load feed:", err);
      setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [canSee]);

  if (loading) return <div>Loading feed…</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Updates</h2>
        {profile?.role === "admin" && (
  <div className="mt-4">
    <Link
      to="/intranet/new"
      className="inline-flex items-center rounded-lg bg-sky-700 text-white px-4 py-2 hover:bg-sky-800"
    >
      New post
    </Link>
  </div>
)}

        <p className="text-gray-600 mt-1">Announcements, policies, and internal notes.</p>
      </div>

      {pinned.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Pinned</h3>
          <div className="grid gap-3">
            {pinned.map((p) => (
              <Link
                key={p.id}
                to={`/intranet/posts/${p.id}`}
                className="block bg-white rounded-2xl shadow-sm border p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs rounded-full bg-amber-100 text-amber-800 px-2 py-0.5">
                    Pinned
                  </span>
                  <h4 className="font-semibold">{p.title}</h4>
                </div>
                <p className="text-gray-700 mt-2">{truncate(p.body)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Recent</h3>
        <div className="grid gap-3">
          {recent.map((p) => (
            <Link
              key={p.id}
              to={`/intranet/posts/${p.id}`}
              className="block bg-white rounded-2xl shadow-sm border p-4 hover:bg-gray-50"
            >
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-gray-700 mt-2">{truncate(p.body)}</p>
            </Link>
          ))}

          {recent.length === 0 && <div className="text-gray-600">No posts yet.</div>}
        </div>
      </section>
    </div>
  );
}
