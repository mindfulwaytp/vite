import { useEffect, useState } from 'react';

export default function AirtableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/functions/airtableBooks')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then(data => {
        // Convert Airtable response into your expected book shape
        const mappedBooks = (data.records || []).map(record => ({
          id: record.id,
          title: record.fields.title || '',
          description: record.fields.description || '',
          link: record.fields.purchaseLink || '',
          imageUrl: record.fields.imageUrl || '',
          tags: record.fields.tags || [],
          category: record.fields.category || '', // assumes you use this in filtering
        }));

        setBooks(mappedBooks);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { books, loading, error };
}
