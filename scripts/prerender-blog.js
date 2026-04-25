// Build-time pre-render for blog posts.
// Runs after `vite build` and writes static HTML for each published post
// so social link previews (Facebook, LinkedIn, iMessage, Slack) and non-JS
// crawlers see real meta tags + content instead of an empty SPA shell.

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://www.mindfulway-therapy.com';
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/images/social-preview.jpg`;

async function loadCredentials() {
  const envJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (envJson) {
    try {
      return JSON.parse(envJson);
    } catch (err) {
      console.error('[prerender] FIREBASE_SERVICE_ACCOUNT env var is not valid JSON.');
      throw err;
    }
  }

  const localPath = path.join(ROOT, 'secrets', 'firebase-service-account.json');
  try {
    const content = await fs.readFile(localPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function escapeHtml(input) {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toIso(value) {
  if (!value) return undefined;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  if (value._seconds !== undefined) {
    return new Date(value._seconds * 1000 + (value._nanoseconds || 0) / 1e6).toISOString();
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function excerptFromHtml(html, max = 200) {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max).trim() + '…' : text;
}

function stripExistingHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, '')
    .replace(/<meta\s+property="article:[^"]+"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, '');
}

function injectIntoHead(html, headFragment) {
  return html.replace('</head>', `${headFragment}\n</head>`);
}

function buildPostHead(post) {
  const description = post.excerpt || excerptFromHtml(post.body, 200);
  const publishedIso = toIso(post.publishedAt);
  const modifiedIso = toIso(post.updatedAt) || publishedIso;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const fullTitle = `${post.title} | Mindful Way Therapy`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    author: post.author ? { '@type': 'Person', name: post.author } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Mindful Way Therapy',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: DEFAULT_SOCIAL_IMAGE },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: (post.tags || []).join(', ') || undefined,
  };

  const articleTagsHtml = (post.tags || [])
    .map((t) => `  <meta property="article:tag" content="${escapeHtml(t)}" />`)
    .join('\n');

  return `
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(url)}" />

  <meta property="og:title" content="${escapeHtml(post.title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Mindful Way Therapy" />
  <meta property="og:image" content="${DEFAULT_SOCIAL_IMAGE}" />
${publishedIso ? `  <meta property="article:published_time" content="${escapeHtml(publishedIso)}" />\n` : ''}${modifiedIso ? `  <meta property="article:modified_time" content="${escapeHtml(modifiedIso)}" />\n` : ''}${post.author ? `  <meta property="article:author" content="${escapeHtml(post.author)}" />\n` : ''}${articleTagsHtml ? `${articleTagsHtml}\n` : ''}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(post.title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${DEFAULT_SOCIAL_IMAGE}" />

  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function buildIndexHead() {
  const title = 'Blog | Mindful Way Therapy';
  const description =
    'Reflections, resources, and updates from Mindful Way Therapy on neurodivergent and LGBTQ+ affirming care.';
  const url = `${SITE_URL}/blog`;

  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(url)}" />

  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Mindful Way Therapy" />
  <meta property="og:image" content="${DEFAULT_SOCIAL_IMAGE}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${DEFAULT_SOCIAL_IMAGE}" />`;
}

async function writeSitemap(posts) {
  const staticUrls = [
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
    '/contact',
    '/contact/ratesfees',
    '/join-our-team',
    '/join-our-team/lgbtq-therapist',
    '/join-our-team/adhd-therapist',
    '/join-our-team/internships',
    '/join-our-team/eating-disorder-therapist',
    '/blog',
  ];

  const today = new Date().toISOString().slice(0, 10);

  const staticEntries = staticUrls
    .map(
      (p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
    )
    .join('\n');

  const blogEntries = posts
    .map((post) => {
      const updated = toIso(post.updatedAt) || toIso(post.publishedAt);
      const lastmod = (updated || `${today}T00:00:00.000Z`).slice(0, 10);
      return `  <url>\n    <loc>${SITE_URL}/blog/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticEntries}\n${blogEntries}\n</urlset>\n`;

  await fs.writeFile(path.join(DIST, 'sitemap.xml'), xml);
}

async function main() {
  const credentials = await loadCredentials();
  if (!credentials) {
    console.warn('[prerender] No service account found.');
    console.warn('[prerender] Looked for: $FIREBASE_SERVICE_ACCOUNT env var, then ./secrets/firebase-service-account.json');
    console.warn('[prerender] Skipping blog pre-render. Posts still work as SPA, but social previews will be empty.');
    return;
  }

  if (!getApps().length) {
    initializeApp({ credential: cert(credentials) });
  }
  const db = getFirestore();

  const snap = await db.collection('blogPosts').where('published', '==', true).get();
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  console.log(`[prerender] Found ${posts.length} published blog post(s)`);

  const templatePath = path.join(DIST, 'index.html');
  const template = await fs.readFile(templatePath, 'utf-8');
  const stripped = stripExistingHeadTags(template);

  for (const post of posts) {
    if (!post.slug) {
      console.warn(`[prerender] Skipping post ${post.id} — missing slug`);
      continue;
    }
    const html = injectIntoHead(stripped, buildPostHead(post));
    const outDir = path.join(DIST, 'blog', post.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html);
    console.log(`[prerender]   /blog/${post.slug}`);
  }

  const indexHtml = injectIntoHead(stripped, buildIndexHead());
  const indexDir = path.join(DIST, 'blog');
  await fs.mkdir(indexDir, { recursive: true });
  await fs.writeFile(path.join(indexDir, 'index.html'), indexHtml);
  console.log('[prerender]   /blog');

  await writeSitemap(posts);
  console.log('[prerender] sitemap.xml regenerated with all blog posts');
  console.log('[prerender] Done.');
}

main().catch((err) => {
  console.error('[prerender] FAILED:', err);
  process.exit(1);
});
