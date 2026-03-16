import Hero from './Hero.jsx';
import About from './About.jsx';
import Projects from './projects/Projects.jsx';
import Blog from './Blog.jsx';
import { sections } from '../config/sections.js';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../content/index.js';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';

function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  useScrollAnimation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const hasVisiblePosts = useMemo(() => {
    return Array.isArray(blogPosts) && blogPosts.some((p) => p.visible);
  }, []);

  const description = t('home.seoDescription');
  const pageUrl = `${SITE_URL}/`;
  const homeTitle = `Home | ${AUTHOR_NAME}`;

  return (
    <>
      <Helmet>
        <title>{homeTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={homeTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/img/me.jpg`} />
        <meta property="og:image:alt" content={`Portrait of ${AUTHOR_NAME}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/img/me.jpg`} />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: AUTHOR_NAME,
          url: SITE_URL,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        })}</script>
      </Helmet>

      {sections.hero && <Hero />}
      {sections.about && <About />}
      {sections.projects && <Projects />}
      {sections.blog && hasVisiblePosts && <Blog />}
    </>
  );
}

export default Home;
