export async function onRequest(context) {
  const { AIRTABLE_TOKEN } = context.env;

  if (!AIRTABLE_TOKEN) {
    return new Response(JSON.stringify({ error: 'Missing Airtable token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = "https://api.airtable.com/v0/appjQb7xeAtRjHH19/Books";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: errorText }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();

  const books = (data.records || []).map((record) => ({
    id: record.id,
    title: record.fields.title || '',
    description: record.fields.description || '',
    link: record.fields.purchaseLink || '',
    imageUrl: record.fields.imageUrl || '',
    tags: record.fields.tags || [],
    category: record.fields.category || '',
  }));

  return new Response(JSON.stringify({ books }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
