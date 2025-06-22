// netlify/functions/airtableBooks.cjs
const fetch = require('node-fetch');

exports.handler = async function () {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing Airtable credentials' }),
      };
    }

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If Airtable returns an error, return that too
    if (!res.ok) {
      const text = await res.text(); // Don't parse as JSON if it failed
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Airtable error: ${text}` }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.records || []),
    };
  } catch (err) {
    // Always stringify the error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Unknown error' }),
    };
  }
};
