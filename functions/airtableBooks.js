export async function onRequest(context) {
  const token = context.env.AIRTABLE_TOKEN;
  const baseId = context.env.AIRTABLE_BASE_ID;
  const table = 'Books'; // change if needed

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
