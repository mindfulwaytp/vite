export default {
  async fetch(request, env) {
    const baseId = env.AIRTABLE_BASE_ID;
    const token = env.AIRTABLE_TOKEN;

    const airtableUrl = `https://api.airtable.com/v0/${baseId}/books`;

    try {
      const res = await fetch(airtableUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        return new Response(JSON.stringify({ error: `Airtable error: ${text}` }), {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const data = await res.json();
      return new Response(JSON.stringify(data.records || []), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
