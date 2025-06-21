import { useEffect, useState } from 'react';

export default function useAirtableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/airtableBooks') // ← hitting your serverless function
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then((data) => {
        setBooks(data.books || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { books, loading, error };
}
