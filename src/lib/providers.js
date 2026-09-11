// Provider rows come from SheetDB at runtime and from the build-time snapshot in
// src/data/providers.json. Both are raw sheet rows with comma-separated strings,
// so both must go through the same parsing before rendering.
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
