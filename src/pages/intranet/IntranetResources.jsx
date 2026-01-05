import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RESOURCES } from "../../config/resources.config";

export default function IntranetResources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get("search") || ""
  );

  // 🔁 Keep local state in sync with URL
  useEffect(() => {
    const param = searchParams.get("search") || "";
    setQuery(param);
  }, [searchParams]);

  /**
   * Flatten all resources into a searchable list
   */
  const allResources = useMemo(() => {
    return Object.entries(RESOURCES).flatMap(
      ([categoryId, category]) =>
        (category.items ?? []).map((item) => {
          const tags = Array.isArray(item.tags)
            ? item.tags
            : item.tags
            ? [item.tags]
            : [];

          const searchText = [
            item.title,
            item.description,
            ...tags,
            category.title,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return {
            ...item,
            tags,
            searchText,
            categoryId,
            categoryTitle: category.title,
          };
        })
    );
  }, []);

  /**
   * Filter resources by normalized search text
   */
  const filteredResources = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return allResources.filter((res) =>
      res.searchText.includes(q)
    );
  }, [query, allResources]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Page header */}
      <h1 className="text-2xl font-semibold mb-4">
        Resources
      </h1>

      {/* 🔍 SEARCH RESULTS */}
      {isSearching && (
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <p className="text-gray-500">
              No resources found for “{query}”.
            </p>
          ) : (
            filteredResources.map((res) => (
              <Link
                key={`${res.categoryId}-${res.id}`}
                to={`/intranet/resources/${res.categoryId}/${res.id}`}
                className="block border rounded-md p-4 hover:bg-gray-50 transition"
              >
                <div className="text-xs text-gray-500 mb-1">
                  {res.categoryTitle}
                </div>

                <h3 className="font-semibold">
                  {res.title}
                </h3>

                {res.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {res.description}
                  </p>
                )}

                {res.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSearchParams({ search: tag });
                        }}
                        className="text-xs px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      )}

      {/* 📁 CATEGORY CARDS (only when NOT searching) */}
      {!isSearching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(RESOURCES).map(
            ([categoryId, category]) => {
              const Icon = category.icon;

              return (
                <Link
                  key={categoryId}
                  to={`/intranet/resources/${categoryId}`}
                  className="border rounded-lg p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {Icon && (
                      <Icon className="text-xl text-sky-700" />
                    )}
                    <h2 className="text-lg font-semibold">
                      {category.title}
                    </h2>
                  </div>

                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
