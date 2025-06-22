import { useEffect, useState } from 'react';

export default function useAirtableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/airtableBooks')
      .then(async (res) => {
        const text = await res.text();

        try {
          const data = JSON.parse(text);

          if (!Array.isArray(data)) {
            throw new Error('Unexpected response format: expected an array');
          }

          const normalized = data
            .filter(record => record.fields?.Title)
            .map(record => ({
              id: record.id,
              title: record.fields.Title,
              author: record.fields.Author,
              description: record.fields.Description,
              link: record.fields.Link,
              tags: record.fields.Tags || [],
              imageUrl: record.fields.Image?.[0]?.thumbnails?.large?.url || null,
              category: record.fields.Category || '',
            }));

          setBooks(normalized);
          setLoading(false);
        } catch (jsonErr) {
          throw new Error(`Error parsing response: ${jsonErr.message}\nRaw: ${text}`);
        }
      })
      .catch((err) => {
        console.error('Error loading books:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { books, loading, error };
}
