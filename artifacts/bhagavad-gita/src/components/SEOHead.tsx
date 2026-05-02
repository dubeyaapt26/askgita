import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  jsonLd?: object | object[];
  type?: "website" | "article";
  noIndex?: boolean;
}

export const DOMAIN = "https://askgita.net";
const DEFAULT_IMAGE = `${DOMAIN}/opengraph.jpg`;
const SITE_NAME = "AskGita.net — Bhagavad Gita";

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  jsonLd,
  type = "website",
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes("Bhagavad Gita") ? title : `${title} | Bhagavad Gita`;
  const canonicalUrl = canonical ? `${DOMAIN}${canonical}` : DOMAIN;
  const image = ogImage || DEFAULT_IMAGE;

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
