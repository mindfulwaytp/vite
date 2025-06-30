import React, { useState } from 'react';
import Select from 'react-select';
import useAirtableBooks from '../hooks/useAirtableBooks';

const ITEMS_PER_PAGE = 6;

export default function BookShelf({ category }) {
  const { books, loading, error } = useAirtableBooks();
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredByCategory = books.filter(b =>
  Array.isArray(b.category) &&
  b.category.map(c => c.toLowerCase()).includes(category.toLowerCase())
  );

  const tagOptions = Array.from(
    new Set(filteredByCategory.flatMap(book => book.tags || []))
  )
  .map(tag => ({ value: tag, label: tag}))
  .sort((a,b) => a.label.localeCompare(b.label));

  const filteredBooks = selectedTags.length
    ? filteredByCategory.filter(book =>
        selectedTags.every(tag => book.tags?.includes(tag.value))
      )
    : filteredByCategory;

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
    setCurrentPage(1);
  };

  if (loading) return <p className="text-gray-500">Loading books...</p>;
  if (error) return <p className="text-red-500">Error loading books: {error.message}</p>;

  return (
    <div className="max-w-18xl mx-auto px-4">
      <div className="mb-8">
        <label className="block font-semibold text-gray-700 mb-2">Filter by Tags:</label>
        <Select
          isMulti
          options={tagOptions}
          value={selectedTags}
          onChange={handleTagChange}
          className="text-black"
          placeholder="Select tags..."
        />
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {paginatedBooks.map((book) => (
            <a
              key={book.id}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[500px] bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <div className="w-full h-[270px] flex items-start justify-center overflow-hidden mb-4">
                <img
                  src={book.imageUrl || '/fallback.jpg'}
                  alt={`Cover of ${book.title}`}
                  className="h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-sky-700 text-center w-full">{book.title}</h3>
              <p className="text-base text-gray-700 mt-2 text-left w-full">{book.description}</p>
            </a>
          ))}
        </div>


      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
