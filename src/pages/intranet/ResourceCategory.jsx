import { useParams, Link, useNavigate } from "react-router-dom";
import { RESOURCES } from "../../config/resources.config";

export default function ResourceCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = RESOURCES[categoryId];

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <p className="text-gray-600">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Link
        to="/intranet/resources"
        className="text-sm text-sky-700 hover:underline"
      >
        ← Back to Resources
      </Link>

      <h1 className="text-2xl font-semibold mt-4 mb-6">
        {category.title}
      </h1>

      {(!category.items || category.items.length === 0) ? (
        <p className="text-gray-600">
          Resources coming soon.
        </p>
      ) : (
        <div className="space-y-4">
          {category.items.map((item) => (
            <Link
              key={item.id}
              to={`/intranet/resources/${categoryId}/${item.id}`}
              className="block border rounded-md p-4 hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold">{item.title}</h3>

              {item.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();     // stop <Link>
                        e.stopPropagation();    // stop bubbling
                        navigate(
                          `/intranet/resources?search=${encodeURIComponent(tag)}`
                        );
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
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
