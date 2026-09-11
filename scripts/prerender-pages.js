// Build-time pre-render for static and provider pages.
// Spins up a local preview server, drives a headless browser to each route,
// captures whatever React + Helmet rendered into <head> AND the rendered page
// body, and writes static HTML files so social previews and crawlers that don't
// run JavaScript (most AI crawlers) see real meta tags and real content.
//
// Blog post pages are pre-rendered separately by scripts/prerender-blog.js
// (which uses firebase-admin to fetch posts directly from Firestore).

import { preview } from 'vite';
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://www.mindfulway-therapy.com';
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/images/social-preview.jpg`;

const STATIC_ROUTES = [
  '/',
  '/providers',
  '/neurodiversity',
  '/neurodiversity/assessments',
  '/neurodiversity/affirming-therapy',
  '/neurodiversity/neurodiversity-resources',
  '/services',
  '/services/individual-therapy',
  '/services/couples-family-therapy',
  '/services/polyamory-non-monogamy',
  '/services/queer-affirming-therapy',
  '/services/adhd-autism-evaluations',
  '/services/neurodivergent-affirming-therapy',
  '/services/groups',
  '/services/groups/ttrpg',
  '/contact',
  '/contact/ratesfees',
  '/contact/therapy',
  '/contact/evaluation',
  '/contact/adventuring-party',
  '/join-our-team',
  '/join-our-team/lgbtq-therapist',
  '/join-our-team/adhd-therapist',
  '/join-our-team/internships',
  '/join-our-team/eating-disorder-therapist',
  '/policies',
];

const CONCURRENCY = 4;

function slugifyName(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

function escapeHtml(input) {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripExistingHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, '')
    .replace(/<meta\s+property="article:[^"]+"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, '')
    .replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');
}

function injectIntoHead(html, headFragment) {
  return html.replace('</head>', `${headFragment}\n</head>`);
}

// Replaces the empty SPA mount point with the rendered markup. React clears and
// re-renders the container on mount, so this is for crawlers, not hydration.
function injectIntoRoot(html, rootHtml) {
  if (!rootHtml) return html;
  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${rootHtml}</div>`
  );
}

function buildHeadFragment({ title, description, canonicalUrl, ogTags, twitterTags, jsonLd }) {
  const og = new Map(ogTags);
  const tw = new Map(twitterTags);

  if (!og.has('og:title') && title) og.set('og:title', title);
  if (!og.has('og:description') && description) og.set('og:description', description);
  if (!og.has('og:url')) og.set('og:url', canonicalUrl);
  if (!og.has('og:type')) og.set('og:type', 'website');
  if (!og.has('og:site_name')) og.set('og:site_name', 'Mindful Way Therapy');
  if (!og.has('og:image')) og.set('og:image', DEFAULT_SOCIAL_IMAGE);

  if (!tw.has('twitter:card')) tw.set('twitter:card', 'summary_large_image');
  if (!tw.has('twitter:title') && title) tw.set('twitter:title', title);
  if (!tw.has('twitter:description') && description) tw.set('twitter:description', description);
  if (!tw.has('twitter:image')) tw.set('twitter:image', DEFAULT_SOCIAL_IMAGE);

  const ogHtml = Array.from(og.entries())
    .map(([k, v]) => `  <meta property="${escapeHtml(k)}" content="${escapeHtml(v)}" />`)
    .join('\n');

  const twHtml = Array.from(tw.entries())
    .map(([k, v]) => `  <meta name="${escapeHtml(k)}" content="${escapeHtml(v)}" />`)
    .join('\n');

  const jsonLdHtml = jsonLd
    ? `\n  <script type="application/ld+json" data-prerendered>${jsonLd}</script>`
    : '';

  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

${ogHtml}

${twHtml}${jsonLdHtml}`;
}

async function snapshotRoute(browser, baseUrl, route, template, options = {}) {
  const { bodyOnly = false } = options;
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  await page.setViewport({ width: 1280, height: 900 });

  try {
    if (bodyOnly) {
      // Firestore holds a network connection open, so networkidle0 never fires on
      // blog routes. Wait for rendered article text instead.
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page
        .waitForFunction(
          () => {
            const el = document.getElementById('root');
            const text = el?.innerText || '';
            return text.length > 500 && !/Loading[….]/.test(text);
          },
          { timeout: 20000 }
        )
        .catch(() => {});
      await new Promise((r) => setTimeout(r, 500));
    } else {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    }

    // Wait for Helmet to have run on pages that use it. Pages without Helmet (e.g. provider profiles)
    // simply time out and proceed — that's expected.
    await page.waitForFunction(
      () => document.querySelectorAll('head [data-rh], head [data-react-helmet]').length > 0,
      { timeout: 5000 }
    ).catch(() => {});

    // Buffer for imperative title/description updates triggered by data-fetch effects (provider profile)
    await new Promise((r) => setTimeout(r, 600));

    const captured = await page.evaluate(() => {
      // document.title reflects whatever React-Helmet most recently set (and stays in sync with the <title> element).
      // We prefer it over scraping the title tag because Helmet's title-rendering can produce empty <title> tags.
      const title = (document.title || '').trim();

      // For meta tags, Helmet appends with data-rh="true". Shell tags (from index.html) come first.
      // Map.set with later-wins gets us Helmet's values when present, falls back to shell when not.
      const descEls = Array.from(document.querySelectorAll('head meta[name="description"]'));
      const description = descEls.length ? (descEls[descEls.length - 1].getAttribute('content') || '') : '';

      const canonicalEls = Array.from(document.querySelectorAll('head link[rel="canonical"]'));
      const canonical = canonicalEls.length ? (canonicalEls[canonicalEls.length - 1].getAttribute('href') || '') : '';

      // Only capture OG/Twitter tags managed by Helmet. Shell defaults are stale for non-home pages and
      // would defeat synthesis. If Helmet didn't manage them, our buildHeadFragment will synthesize from title/desc.
      const ogMap = new Map();
      document.querySelectorAll(
        'head meta[property^="og:"][data-rh="true"], head meta[property^="og:"][data-react-helmet="true"], head meta[property^="article:"][data-rh="true"]'
      ).forEach((el) => {
        const k = el.getAttribute('property');
        const v = el.getAttribute('content');
        if (k && v) ogMap.set(k, v);
      });

      const twMap = new Map();
      document.querySelectorAll(
        'head meta[name^="twitter:"][data-rh="true"], head meta[name^="twitter:"][data-react-helmet="true"]'
      ).forEach((el) => {
        const k = el.getAttribute('name');
        const v = el.getAttribute('content');
        if (k && v) twMap.set(k, v);
      });

      // Not head-only: under React 19, react-helmet-async hoists title/meta/link into <head>
      // but leaves <script> tags where they render, in the body.
      const jsonLdEls = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const jsonLd = jsonLdEls.length ? jsonLdEls[jsonLdEls.length - 1].textContent : '';

      // Rendered markup for crawlers. Scripts are dropped so nothing executes twice
      // (the JSON-LD is re-emitted into <head> instead), and iframes are dropped so
      // embeds like the intake form don't load once statically and again under React.
      const rootEl = document.getElementById('root');
      let rootHtml = '';
      if (rootEl) {
        const clone = rootEl.cloneNode(true);
        clone.querySelectorAll('script, iframe, noscript').forEach((el) => el.remove());
        rootHtml = clone.innerHTML;
      }

      return {
        rootHtml,
        title,
        description,
        canonical,
        ogTags: Array.from(ogMap.entries()),
        twitterTags: Array.from(twMap.entries()),
        jsonLd,
      };
    });

    const canonicalUrl = captured.canonical || `${SITE_URL}${route.endsWith('/') ? route : `${route}/`}`;

    const headFragment = buildHeadFragment({
      title: captured.title,
      description: captured.description,
      canonicalUrl,
      ogTags: captured.ogTags,
      twitterTags: captured.twitterTags,
      jsonLd: captured.jsonLd,
    });

    if (bodyOnly) {
      if (!captured.rootHtml) throw new Error('no rendered content captured');
      return injectIntoRoot(template, captured.rootHtml);
    }

    const html = injectIntoHead(stripExistingHeadTags(template), headFragment);
    return injectIntoRoot(html, captured.rootHtml);
  } finally {
    await page.close();
  }
}

function routeOutputPath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  const trimmed = route.replace(/^\/+|\/+$/g, '');
  return path.join(DIST, trimmed, 'index.html');
}

async function loadProviderRoutes() {
  try {
    const json = await fs.readFile(path.join(ROOT, 'src', 'data', 'providers.json'), 'utf-8');
    const providers = JSON.parse(json);
    return providers
      .map((p) => p?.name)
      .filter(Boolean)
      .map((name) => `/providers/${slugifyName(name)}`);
  } catch (err) {
    console.warn('[prerender-pages] Could not load providers.json:', err.message);
    return [];
  }
}

// Blog pages are written by scripts/prerender-blog.js (head only, from Firestore).
// Whatever it produced this build gets its body captured here.
async function loadBlogRoutes() {
  const blogDir = path.join(DIST, 'blog');
  try {
    const entries = await fs.readdir(blogDir, { withFileTypes: true });
    const routes = [];
    for (const entry of entries) {
      if (entry.isDirectory()) routes.push(`/blog/${entry.name}`);
    }
    try {
      await fs.access(path.join(blogDir, 'index.html'));
      routes.unshift('/blog');
    } catch {
      // no blog index this build
    }
    return routes;
  } catch {
    return [];
  }
}

async function captureBatch(routes, browser, baseUrl, template, snapshots, options = {}) {
  const results = await Promise.allSettled(
    routes.map(async (route) => {
      // Blog pages already have head tags written from Firestore data; re-use that
      // file as the template so only the rendered body is added.
      const routeTemplate = options.bodyOnly
        ? await fs.readFile(routeOutputPath(route), 'utf-8')
        : template;
      const html = await snapshotRoute(browser, baseUrl, route, routeTemplate, options);
      snapshots.set(route, html);
      return route;
    })
  );

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const route = routes[i];
    if (result.status === 'fulfilled') {
      console.log(`[prerender-pages]   captured ${route}`);
    } else {
      console.error(`[prerender-pages]   ✗ ${route}: ${result.reason?.message || result.reason}`);
    }
  }
}

async function main() {
  console.log('[prerender-pages] Starting Vite preview server...');
  let server;
  try {
    server = await preview({
      root: ROOT,
      preview: { port: 4173, host: '127.0.0.1', strictPort: true },
    });
  } catch (err) {
    console.error('[prerender-pages] Failed to start preview server:', err.message);
    throw err;
  }

  const baseUrl = 'http://127.0.0.1:4173';
  console.log(`[prerender-pages] Preview server: ${baseUrl}`);

  const providerRoutes = await loadProviderRoutes();
  const allRoutes = [...STATIC_ROUTES, ...providerRoutes];
  console.log(`[prerender-pages] Pre-rendering ${allRoutes.length} routes (${STATIC_ROUTES.length} static + ${providerRoutes.length} provider)`);

  console.log('[prerender-pages] Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const templatePath = path.join(DIST, 'index.html');
    const template = await fs.readFile(templatePath, 'utf-8');

    // Capture phase: snapshot all routes WITHOUT writing files yet.
    // Writing files mid-capture would change what the SPA fallback serves
    // and contaminate later captures.
    const snapshots = new Map();
    for (let i = 0; i < allRoutes.length; i += CONCURRENCY) {
      const batch = allRoutes.slice(i, i + CONCURRENCY);
      await captureBatch(batch, browser, baseUrl, template, snapshots);
    }

    // The SPA fallback can no longer be index.html: that file now carries the
    // home page's rendered body, which would be served for every unmatched route.
    // app-shell.html keeps an empty mount point for client-side routing.
    await fs.writeFile(path.join(DIST, 'app-shell.html'), template);
    console.log('[prerender-pages] Wrote app-shell.html (SPA fallback)');

    // Blog pages: capture rendered bodies into the files prerender-blog just wrote.
    const blogRoutes = await loadBlogRoutes();
    if (blogRoutes.length) {
      console.log(`[prerender-pages] Capturing ${blogRoutes.length} blog route(s)`);
      const blogSnapshots = new Map();
      for (let i = 0; i < blogRoutes.length; i += CONCURRENCY) {
        const batch = blogRoutes.slice(i, i + CONCURRENCY);
        await captureBatch(batch, browser, baseUrl, template, blogSnapshots, { bodyOnly: true });
      }
      for (const [route, html] of blogSnapshots) snapshots.set(route, html);
    }

    // Write phase: persist all snapshots to disk.
    console.log(`[prerender-pages] Writing ${snapshots.size} files...`);
    for (const [route, html] of snapshots) {
      const outPath = routeOutputPath(route);
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, html);
    }
  } finally {
    await browser.close();
    if (server?.httpServer?.close) {
      await new Promise((resolve) => server.httpServer.close(resolve));
    } else if (server?.close) {
      await server.close();
    }
  }

  console.log('[prerender-pages] Done.');
}

main().catch((err) => {
  console.error('[prerender-pages] FAILED:', err);
  console.warn('[prerender-pages] Continuing build without per-page prerendering. Site will still deploy; social previews on pages other than blog/home may be generic.');
  process.exit(0);
});
