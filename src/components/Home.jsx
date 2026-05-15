import Hero from './Hero.jsx';
import About from './About.jsx';
import Projects from './projects/Projects.jsx';
import Blog from './Blog.jsx';
import Footer from './Footer.jsx';
import { sections } from '../config/sections.js';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import useSeoMetadata from '../hooks/useSeoMetadata.js';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { blogPosts } from '../content/index.js';

function Home() {
  const { t } = useTranslation();
  useScrollAnimation();

  const hasVisiblePosts = useMemo(() => {
    return Array.isArray(blogPosts) && blogPosts.some((p) => p.visible);
  }, []);

  useSeoMetadata({
    title: 'Home',
    description: t('home.seoDescription'),
    pageUrl: SITE_URL,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: AUTHOR_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Hero />
      {sections.about && <About />}
      {sections.projects && <Projects />}
      {sections.blog && hasVisiblePosts && <Blog />}
      <Footer />
    </>
  );
}

export default Home;
