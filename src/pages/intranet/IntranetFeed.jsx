import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query as fsQuery,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";

function truncate(s, n = 160) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trim() + "…" : s;
}

export default function IntranetFeed() {
  const outlet = useOutletContext();
  const profile = outlet?.profile;

  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const isSearching = query.trim().length > 0;

  const [pinned, setPinned] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const myRole = profile?.role;

  const canSee = useMemo(() => {
    return (aud) =>
      Array.isArray(aud) &&
      (aud.includes("all") || (myRole ? aud.includes(myRole) : false));
  }, [myRole]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const postsRef = collection(db, "posts");

      const pinnedQ = fsQuery(
        postsRef,
        where("pinned", "==", true),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      const recentQ = fsQuery(
        postsRef,
        where("pinned", "==", false),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const [pSnap, rSnap] = await Promise.all([
        getDocs(pinnedQ),
        getDocs(recentQ),
      ]);

      if (!alive) return;

      const pinnedPosts = pSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      const recentPosts = rSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

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

  // 🔍 SEARCH FILTERING (client-side)
  const q = query.toLowerCase().trim();

  const filteredPinned = useMemo(() => {
    if (!isSearching) return pinned;

    return pinned.filter((p) => {
      const searchText = `${p.title ?? ""} ${p.body ?? ""}`.toLowerCase();
      return searchText.includes(q);
    });
  }, [pinned, isSearching, q]);

  const filteredRecent = useMemo(() => {
    if (!isSearching) return recent;

    return recent.filter((p) => {
      const searchText = `${p.title ?? ""} ${p.body ?? ""}`.toLowerCase();
      return searchText.includes(q);
    });
  }, [recent, isSearching, q]);

  if (loading) return <div>Loading feed…</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Updates</h2>
        <p className="text-gray-600 mt-1">
          Announcements, policies, and internal notes.
        </p>

        {isSearching && (
          <p className="text-sm text-gray-500 mt-2">
            Showing posts matching “{query}”
          </p>
        )}

        {profile?.role === "admin" && !isSearching && (
          <div className="mt-4">
            <Link
              to="/intranet/new"
              className="inline-flex items-center rounded-lg bg-sky-700 text-white px-4 py-2 hover:bg-sky-800"
            >
              New post
            </Link>
          </div>
        )}
      </div>

      {filteredPinned.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Pinned</h3>
          <div className="grid gap-3">
            {filteredPinned.map((p) => (
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
                <p className="text-gray-700 mt-2">
                  {truncate(p.body)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">
          {isSearching ? "Matching Posts" : "Recent"}
        </h3>

        <div className="grid gap-3">
          {filteredRecent.map((p) => (
            <Link
              key={p.id}
              to={`/intranet/posts/${p.id}`}
              className="block bg-white rounded-2xl shadow-sm border p-4 hover:bg-gray-50"
            >
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-gray-700 mt-2">
                {truncate(p.body)}
              </p>
            </Link>
          ))}

          {filteredRecent.length === 0 && (
            <div className="text-gray-600">
              {isSearching
                ? "No posts match your search."
                : "No posts yet."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
