// Piwik PRO analytics. Chosen over Google Analytics because they sign a BAA —
// a page path like /contact/therapy reveals that a visitor is seeking therapy.
import PiwikPro, { PageViews } from '@piwikpro/react-piwik-pro';

const CONTAINER_ID = 'afe10d91-7996-4d05-a6d0-d722c3397b8b';
const CONTAINER_URL = 'https://mwtherapy.containers.piwik.pro';

// The build drives a headless browser over every route against the local preview
// server (scripts/prerender-pages.js), which would otherwise record a phantom
// visit to all ~42 pages on every deploy. Local dev is excluded for the same reason.
function isRealVisitor() {
  if (typeof window === 'undefined') return false;

  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') return false;

  if (navigator.webdriver) return false;

  return true;
}

let started = false;

export function startAnalytics() {
  if (started || !isRealVisitor()) return;
  PiwikPro.initialize(CONTAINER_ID, CONTAINER_URL);
  started = true;
}

// The container records the first page view itself; this is for client-side
// navigations, which would otherwise never be counted in a single-page app.
export function trackNavigation() {
  if (!started) return;
  PageViews.trackPageView();
}
