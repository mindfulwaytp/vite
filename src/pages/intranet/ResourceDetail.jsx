import { useParams, Link } from "react-router-dom";
import { RESOURCES } from "../../config/resources.config";

export default function ResourceDetail() {
  const { categoryId, resourceId } = useParams();

  console.log("categoryId from URL:", categoryId);
  console.log("resourceId from URL:", resourceId);
  console.log("RESOURCES keys:", Object.keys(RESOURCES));

  const category = RESOURCES[categoryId];
  console.log("category found:", category);

  console.log("category items:", category?.items);

  const resource = category?.items.find(
    (item) => item.id === resourceId
  );

  console.log("resource found:", resource);


  if (!category || !resource) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <p className="text-gray-600">Resource not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Breadcrumbs */}
      <div className="text-sm mb-4 space-x-2">
        <Link
          to="/intranet/resources"
          className="text-sky-700 hover:underline"
        >
          Resources
        </Link>
        <span>/</span>
        <Link
          to={`/intranet/resources/${categoryId}`}
          className="text-sky-700 hover:underline"
        >
          {category.title}
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          {resource.title}
        </h1>

        {resource.driveUrl && (
          <a
            href={resource.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sky-700 hover:underline"
          >
            Open in Google Drive
          </a>
        )}
      </div>

      {resource.description && (
        <p className="text-gray-600 mb-4">
          {resource.description}
        </p>
      )}

      {/* Embed */}
      {resource.embedUrl ? (
        <div className="w-full h-[80vh] border rounded-md overflow-hidden bg-white">
          <iframe
            src={resource.embedUrl}
            title={resource.title}
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      ) : (
        <p className="text-gray-600">
          No preview available for this resource.
        </p>
      )}
    </div>
  );
}
