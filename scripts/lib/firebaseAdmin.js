// Firestore access for build and maintenance scripts. Credentials come from the
// FIREBASE_SERVICE_ACCOUNT env var (Netlify) or secrets/firebase-service-account.json
// (local). Returns null when neither exists, so callers can fall back gracefully.

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

async function loadCredentials() {
  const envJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (envJson) return JSON.parse(envJson);

  try {
    const localPath = path.join(ROOT, 'secrets', 'firebase-service-account.json');
    return JSON.parse(await fs.readFile(localPath, 'utf-8'));
  } catch {
    return null;
  }
}

export async function getAdminFirestore() {
  const credentials = await loadCredentials();
  if (!credentials) return null;
  if (!getApps().length) initializeApp({ credential: cert(credentials) });
  return getFirestore();
}
