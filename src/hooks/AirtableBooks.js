// src/hooks/useAirtableBooks.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function useAirtableBooks(tableName = 'Books') {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseId = 'appjQb7xeAtRjHH19';
  const token = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  console.log('AIRTABLE TOKEN:', token); // 👈 add this line

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get(
          `https://api.airtable.com/v0/${baseId}/${tableName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const records = res.data.records.map(record => ({
          id: record.id,
          ...record.fields,
          category: record.fields.Category?.toLowerCase() || '', // add this
          tags: record.fields.Tags || [],                        // make sure tags are always present
          title: record.fields.Title,
          description: record.fields.Description,
          link: record.fields.Link,
          imageUrl: record.fields.Image?.[0]?.url || '',         // handle image field
        }));


        setBooks(records);
      } catch (err) {
        console.error('Error fetching books from Airtable:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [tableName, token]);

  return { books, loading };
}

export default useAirtableBooks;
