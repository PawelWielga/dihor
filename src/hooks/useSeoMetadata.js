import { useMemo } from 'react';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';

export function useSeoMetadata({
  title,
  description,
  pageUrl,
  type = 'website',
  image,
  jsonLd,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${AUTHOR_NAME}` : AUTHOR_NAME;
  const ogImage = image || `${SITE_URL}/img/me.jpg`;
  const canonicalUrl = pageUrl || SITE_URL;

  const meta = useMemo(
    () => ({
      title: fullTitle,
      description,
      pageUrl: canonicalUrl,
      type,
      ogImage,
      jsonLd,
      noIndex,
    }),
    [fullTitle, description, canonicalUrl, type, ogImage, jsonLd, noIndex]
  );

  const helmetContent = useMemo(
    () => ({
      title: fullTitle,
      meta: [
        { name: 'description', content: description },
        { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' },
        { property: 'og:type', content: type },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:alt', content: `Portrait of ${AUTHOR_NAME}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
      link: [{ rel: 'canonical', href: canonicalUrl }],
    }),
    [fullTitle, description, canonicalUrl, type, ogImage, noIndex]
  );

  return { meta, helmetContent };
}

export default useSeoMetadata;
