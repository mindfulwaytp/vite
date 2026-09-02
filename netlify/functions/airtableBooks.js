// Netlify Function (v2). Proxies the Airtable "Books" table so the token
// stays server-side. Same-origin from the site, so no CORS headers needed.
export default async () => {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_TOKEN;

  if (!baseId || !token) {
    return Response.json(
      { error: 'Missing Airtable credentials' },
      { status: 500 }
    );
  }

  try {
    // Airtable caps each response at 100 records, so follow the offset cursor.
    const records = [];
    let offset;

    do {
      const url = new URL(`https://api.airtable.com/v0/${baseId}/Books`);
      url.searchParams.set('pageSize', '100');
      if (offset) url.searchParams.set('offset', offset);

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        return Response.json(
          { error: `Airtable error: ${text}` },
          { status: res.status }
        );
      }

      const data = await res.json();
      records.push(...(data.records || []));
      offset = data.offset;
    } while (offset);

    return Response.json(records, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  } catch (err) {
    return Response.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
};
