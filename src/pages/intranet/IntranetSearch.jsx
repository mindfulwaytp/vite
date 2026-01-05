import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { useIntranetSearch } from "../../hooks/useIntranetSearch";

export default function IntranetSearch() {
  // 🔎 Read query from URL (?q=...)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // 🔍 Build global search index
  const searchIndex = useIntranetSearch({
    posts: [], // we will add these later
    links: [], // later
  });

  // 🔎 Filter results
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return searchIndex.filter((item) =>
      item.text.includes(q)
    );
  }, [searchIndex, query]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Search results
        </h1>
        <p className="text-gray-600 mt-1">
          Results for “{query}”
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <p className="text-gray-600">
          No results found.
        </p>
      ) : (
        <div className="space-y-3">
          {results.map((r) => (
            <Link
                key={r.id}
                to={r.url}
                className="block border rounded-md p-4 hover:bg-gray-50"
                >
                <div className="font-semibold">{r.title}</div>

                <div className="text-xs text-gray-500 mt-1">
                    {r.type} · {r.meta}
                </div>

                {r.tags && r.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                        <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 rounded"
                        >
                        {tag}
                        </span>
                    ))}
                    </div>
                )}
                </Link>
          ))}
        </div>
      )}
    </div>
  );
}
