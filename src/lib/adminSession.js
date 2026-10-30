// Timed sign-out for the admin pages. Last activity lives in localStorage so every
// open tab shares it; why a sign-out happened and where to return to after signing
// back in live in sessionStorage, for the login page to pick up.

export const IDLE_LIMIT_MS = 30 * 60 * 1000;
export const MAX_SESSION_MS = 12 * 60 * 60 * 1000;
export const WARNING_MS = 2 * 60 * 1000;

const LAST_ACTIVE_KEY = 'adminLastActive';
const REASON_KEY = 'adminSignOutReason';
const RETURN_TO_KEY = 'adminReturnTo';

function read(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function write(storage, key, value) {
  try {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  } catch {
    // Storage blocked (private mode, etc.); the in-tab timer still works.
  }
}

export function markActive() {
  write(localStorage, LAST_ACTIVE_KEY, String(Date.now()));
}

// 0 when nothing's recorded, which counts as idle: a session from before sign-in
// recorded activity gets signed out once.
export function lastActive() {
  return Number(read(localStorage, LAST_ACTIVE_KEY)) || 0;
}

export function setSignOutReason(reason) {
  write(sessionStorage, REASON_KEY, reason);
}

export function signOutReason() {
  return read(sessionStorage, REASON_KEY);
}

export function clearSignOutReason() {
  write(sessionStorage, REASON_KEY, null);
}

export function rememberReturnTo(path) {
  write(sessionStorage, RETURN_TO_KEY, path);
}

export function consumeReturnTo() {
  const path = read(sessionStorage, RETURN_TO_KEY);
  write(sessionStorage, RETURN_TO_KEY, null);
  return path;
}
