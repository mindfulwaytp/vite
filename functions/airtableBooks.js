export async function onRequest(context) {
  const { AIRTABLE_TOKEN } = context.env;

  const response = await fetch("https://api.airtable.com/v0/appjQb7xeAtRjHH19/Books", {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: await response.text() }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
