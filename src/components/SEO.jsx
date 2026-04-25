import { Helmet } from 'react-helmet-async';

function SEO({
  title,
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
  const baseUrl = 'https://www.mindfulway-therapy.com';
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : null;

  const titleHasBrand = /mindful\s*way\s*therapy/i.test(title || '');
  const fullTitle = titleHasBrand ? title : `${title} | Mindful Way Therapy`;

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
