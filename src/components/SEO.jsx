import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Netlify serves each prerendered route as /path/ and 301s /path → /path/, so a
// canonical without the trailing slash points search engines at a redirect.
function toCanonicalPath(path) {
  const clean = path.split(/[?#]/)[0] || '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
}

const TITLE_LIMIT = 60;

function SEO({
  title,
  appendSiteName = true,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  jsonLd,
}) {
  const { pathname } = useLocation();
  const baseUrl = 'https://www.mindfulway-therapy.com';
  // Default to the page's own URL — falling back to the homepage told search
  // engines every page without an explicit canonical was a duplicate of it.
  const fullUrl = `${baseUrl}${toCanonicalPath(canonical || pathname)}`;
  const fullImage = image ? `${baseUrl}${image}` : null;

  // Google truncates titles at roughly 600px, about 60 characters. The brand
  // suffix is the least useful thing in a title, so append it only when it
  // survives that cut: a page whose own title is already long keeps all of its
  // keywords instead of trailing off mid-brand. Pass appendSiteName={false} to
  // suppress it regardless.
  const titleHasBrand = /mindful\s*way\s*therapy/i.test(title || '');
  const withSiteName = `${title} | Mindful Way Therapy`;
  const fullTitle =
    titleHasBrand || !appendSiteName || withSiteName.length > TITLE_LIMIT
      ? title
      : withSiteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mindful Way Therapy" />
      {fullImage && <meta property="og:image" content={fullImage} />}

      {/* Article-specific OG (only emitted for type=article) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' &&
        tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content={fullImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {fullImage && <meta name="twitter:image" content={fullImage} />}

      {/* Structured data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
