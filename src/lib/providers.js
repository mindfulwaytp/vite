// Provider rows come from Firestore at runtime and from the build-time snapshot in
// src/data/providers.json. Both are raw sheet-style rows with comma-separated
// strings, so both must go through the same parsing before rendering.
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import providersSnapshot from '../data/providers.json';

const LIST_FIELDS = [
  'specialties',
  'topSpecialties',
  'modalities',
  'insurance',
  'location',
  'services',
  'gender',
];

export function parseProviderRow(row) {
  const parsed = {
    ...row,
    bioIntro: (row.bioIntro || '').trim(),
    bioBody: (row.bioBody || '').trim(),
  };

  for (const field of LIST_FIELDS) {
    const value = row[field];
    parsed[field] =
      typeof value === 'string'
        ? value.split(',').map((s) => s.trim()).filter(Boolean)
        : value || [];
  }

  return parsed;
}

export function parseProviderRows(rows) {
  return (rows || []).map(parseProviderRow);
}

// Parsed build-time snapshot, used to render before the live fetch resolves.
export const seededProviders = parseProviderRows(providersSnapshot);

// Firestore is the source of truth (availability is edited at /admin/providers);
// providers.json is a snapshot of it refreshed on every build. Pages seed from the
// snapshot, then catch up to Firestore.
export async function fetchProviders() {
  const snap = await getDocs(query(collection(db, 'providers'), orderBy('order')));
  // An empty result means the collection hasn't been populated; keep the snapshot
  // rather than render an empty directory.
  if (snap.empty) throw new Error('No providers in Firestore');
  return parseProviderRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}
