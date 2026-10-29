// Runs before `vite build`: refreshes src/data/providers.json from Firestore so
// pre-rendered provider pages ship with current data. Without credentials (or if
// Firestore comes back empty) it leaves the committed snapshot as is.

import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, getAdminFirestore } from './lib/firebaseAdmin.js';

// Bookkeeping fields that aren't part of a provider row (and Timestamps don't survive JSON).
const NON_ROW_FIELDS = ['order', 'updatedAt', 'updatedBy'];

async function main() {
  const db = await getAdminFirestore();
  if (!db) {
    console.warn('[snapshot-providers] No Firebase credentials; keeping the existing providers.json.');
    return;
  }

  const snap = await db.collection('providers').orderBy('order').get();
  if (snap.empty) {
    console.warn('[snapshot-providers] Firestore has no providers; keeping the existing providers.json.');
    return;
  }

  const rows = snap.docs.map((doc) => {
    const row = { ...doc.data() };
    for (const field of NON_ROW_FIELDS) delete row[field];
    return row;
  });

  const filePath = path.join(ROOT, 'src', 'data', 'providers.json');
  await fs.writeFile(filePath, JSON.stringify(rows, null, 2) + '\n', 'utf-8');
  console.log(`[snapshot-providers] Wrote ${rows.length} providers to providers.json.`);
}

main().catch((err) => {
  // A snapshot failure shouldn't block a deploy; the committed file still works.
  console.warn('[snapshot-providers] Failed; keeping the existing providers.json:', err.message);
});
