import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../content/index.js';
import PageSection from './PageSection.jsx';
import SectionTitle from './SectionTitle.jsx';
import BlogCard from './BlogCard.jsx';
import useSeoMetadata from '../hooks/useSeoMetadata.js';
import { SITE_URL } from '../config/site.js';

function Blog() {
  const { t } = useTranslation();

  const visiblePosts = Array.isArray(blogPosts) ? blogPosts.filter((p) => p.visible) : [];
  const description = t('blog.seoDescription');
  const pageUrl = `${SITE_URL}/blog`;

  const { helmetContent } = useSeoMetadata({
    title: 'Blog',
    description,
    pageUrl,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: 'Blog',
    description,
    url: pageUrl,
  };

  return (
    <PageSection id="blog">
      <Helmet>
        <title>{helmetContent.title}</title>
        {helmetContent.meta.map((m, i) => (
          <meta key={i} {...m} />
        ))}
        {helmetContent.link.map((l, i) => (
          <link key={i} {...l} />
        ))}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <SectionTitle as="h1">{t('nav.blog')}</SectionTitle>
      <p
        className="blog-disclaimer"
        style={{
          marginTop: '0.5rem',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: 'var(--text, #e6e6e6)',
          opacity: 0.9,
        }}
      >
        To moje osobiste notatki bazujące na własnym doświadczeniu i ciągłej nauce.
      </p>

      {visiblePosts.length === 0 ? (
        <p className="blog-empty">
          {t('blog.empty', { defaultValue: 'No posts yet. Check back soon.' })}
        </p>
      ) : (
        <div className="blog-grid" itemScope itemType="https://schema.org/ItemList">
          <meta itemProp="itemListOrder" content="https://schema.org/ItemListUnordered" />
          {visiblePosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </PageSection>
  );
}

export default Blog;
