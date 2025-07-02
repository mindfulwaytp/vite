export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // ✅ Root path handler
    if (pathname === "/") {
      return new Response(JSON.stringify({ status: "API is live" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://www.mindfulway-therapy.com",
        },
      });
    }

    // ✅ /books route handler
    if (pathname === "/books") {
      const baseId = env.AIRTABLE_BASE_ID;
      const token = env.AIRTABLE_TOKEN;

      const airtableUrl = `https://api.airtable.com/v0/${baseId}/Books`;

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
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://www.mindfulway-therapy.com",
            },
          });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data.records || []), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.mindfulway-therapy.com",
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.mindfulway-therapy.com",
          },
        });
      }
    }

    // ❌ Fallback: unknown route
    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://www.mindfulway-therapy.com",
      },
    });
  },
};
