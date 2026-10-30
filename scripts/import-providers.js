// Copies provider rows from the Google Sheet (via SheetDB) into the Firestore
// `providers` collection, one doc per provider keyed by URL slug.
//
// Profiles are edited on the site now (/admin/providers), so by default this only
// adds providers that aren't in Firestore yet and leaves existing ones alone.
//
//   npm run import-providers                  # add new providers from the sheet
//   npm run import-providers -- --overwrite      # replace existing profiles with the sheet's rows
//
// Providers are added and removed on the site too, so this never deletes any.

import process from 'node:process';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from './lib/firebaseAdmin.js';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/zpl35ateeao4a';

// Must match slugify() in the provider pages: the doc id is the profile URL.
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

async function main() {
  const overwrite = process.argv.includes('--overwrite');

  const db = await getAdminFirestore();
  if (!db) {
    console.error('❌ No Firebase credentials. Put the service account JSON at secrets/firebase-service-account.json.');
    process.exit(1);
  }

  const res = await fetch(SHEETDB_URL);
  if (!res.ok) throw new Error(`SheetDB request failed (HTTP ${res.status})`);
  const rows = (await res.json()).filter((row) => row.name?.trim());
  if (!rows.length) throw new Error('SheetDB returned no providers; refusing to sync an empty list.');

  const collection = db.collection('providers');
  const existing = new Map((await collection.get()).docs.map((d) => [d.id, d.data()]));

  const batch = db.batch();

  rows.forEach((row, order) => {
    const id = slugify(row.name.trim());
    const data = { ...row, order };

    const current = existing.get(id);
    if (current && !overwrite) {
      console.log(`= ${row.name} (already here; edit on the site)`);
      return;
    }
    data.updatedAt = FieldValue.serverTimestamp();
    data.updatedBy = 'sheet import';

    batch.set(collection.doc(id), data, { merge: true });
    console.log(`${current ? '↻' : '+'} ${row.name} (${data.acceptingClients || 'no availability'})`);
  });

  await batch.commit();
  console.log(`✅ Checked ${rows.length} providers from the sheet.`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
