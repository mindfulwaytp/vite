import React from 'react';
import { useAirtableBooks } from '../hooks/useAirtableBooks';

function AirtableBookShelf() {
  const { books, loading } = useAirtableBooks(); // fetches all rows from your Airtable table

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {books.map(book => (
        <div key={book.id} className="bg-white p-4 rounded-lg shadow-md max-w-sm text-center">
          <h3 className="text-xl font-bold text-sky-700">{book.Title}</h3>
          <p className="text-gray-700 mt-2">{book.Description}</p>
          <a
            href={book.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline mt-2 block"
          >
            View on Amazon
          </a>
        </div>
      ))}
    </div>
  );
}

export default AirtableBookShelf;
