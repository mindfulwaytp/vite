// Copies provider rows from the Google Sheet (via SheetDB) into the Firestore
// `providers` collection, one doc per provider keyed by URL slug.
//
// Availability is edited on the site now (/admin/providers), so for providers
// already in Firestore this keeps their acceptingClients and updates everything
// else. Until profiles can be edited on the site too, re-run this after changing
// a bio, specialties, etc. in the sheet.
//
//   npm run import-providers                  # sync profile fields, keep availability
//   npm run import-providers -- --availability   # also overwrite availability from the sheet
//   npm run import-providers -- --prune          # also delete providers no longer in the sheet

import process from 'node:process';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from './lib/firebaseAdmin.js';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/zpl35ateeao4a';

// Must match slugify() in the provider pages: the doc id is the profile URL.
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

async function main() {
  const overwriteAvailability = process.argv.includes('--availability');
  const prune = process.argv.includes('--prune');

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
  const seen = new Set();

  rows.forEach((row, order) => {
    const id = slugify(row.name.trim());
    seen.add(id);
    const data = { ...row, order };

    const current = existing.get(id);
    if (current && !overwriteAvailability) {
      data.acceptingClients = current.acceptingClients;
    }
    if (!current || data.acceptingClients !== current.acceptingClients) {
      data.updatedAt = FieldValue.serverTimestamp();
      data.updatedBy = 'sheet import';
    }

    batch.set(collection.doc(id), data, { merge: true });
    console.log(`${current ? '↻' : '+'} ${row.name} (${data.acceptingClients || 'no availability'})`);
  });

  const stale = [...existing.keys()].filter((id) => !seen.has(id));
  for (const id of stale) {
    if (prune) {
      batch.delete(collection.doc(id));
      console.log(`− ${id} (removed)`);
    } else {
      console.warn(`⚠️  ${id} is in Firestore but not the sheet; run with --prune to remove it.`);
    }
  }

  await batch.commit();
  console.log(`✅ Synced ${rows.length} providers to Firestore.`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
