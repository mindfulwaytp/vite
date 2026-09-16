// Plausible analytics. Cookieless: no persistent identifiers, and visitor IPs are
// hashed with a rotating salt rather than stored — so nothing leaves this site that
// ties a page like /contact/therapy to a person.
//
// Loaded as a script rather than via npm: plausible-tracker is still pre-1.0 and
// rarely updated, while this file is what Plausible maintains (bot filtering included).
const DOMAIN = 'mindfulway-therapy.com';
const SCRIPT_URL = 'https://plausible.io/js/script.manual.js';

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

// Direct visits land on /path/ (Netlify redirects /path to it) while in-app links
// point at /path, so the same page would appear as two rows in Plausible. Report the
// trailing-slash form everywhere, matching the canonical URLs.
function canonicalUrl() {
  const { origin, pathname, search } = window.location;
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${origin}${path}${search}`;
}

let started = false;

export function startAnalytics() {
  if (started || !isRealVisitor()) return;

  // Queue stub, so the first page view isn't lost while the script is still loading.
  window.plausible =
    window.plausible ||
    function plausibleStub(...args) {
      (window.plausible.q = window.plausible.q || []).push(args);
    };

  const script = document.createElement('script');
  script.defer = true;
  script.src = SCRIPT_URL;
  script.setAttribute('data-domain', DOMAIN);
  document.head.appendChild(script);

  started = true;

  // script.manual.js sends nothing on its own — the initial view is ours to record.
  window.plausible('pageview', { u: canonicalUrl() });
}

export function trackNavigation() {
  if (!started) return;
  window.plausible('pageview', { u: canonicalUrl() });
}
