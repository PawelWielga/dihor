import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { blogPosts, blogPostMap } from '../content/index.js';
import MarkdownRenderer from './MarkdownRenderer.jsx';
import PageSection from './PageSection.jsx';
import BackLink from './BackLink.jsx';
import BlogCard from './BlogCard.jsx';
import useScrollToTop from '../hooks/useScrollToTop.js';
import useSeoMetadata from '../hooks/useSeoMetadata.js';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';

function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useScrollToTop({ delays: [0, 150] });

  const post = blogPostMap[id];

  const latestPosts = useMemo(() => {
    const list = Array.isArray(blogPosts)
      ? blogPosts.filter((entry) => entry.visible && entry.id !== id)
      : [];
    return list.slice(0, 3);
  }, [id]);

  const pageUrl = `${SITE_URL}/blog/${post?.id}`;
  const description = post?.excerpt || '';
  const image = post?.image?.startsWith('http')
    ? post.image
    : post?.image
      ? `${SITE_URL}${post.image}`
      : `${SITE_URL}/img/me.jpg`;
  const datePublished = post?.dateISO || post?.date || undefined;

  const { helmetContent } = useSeoMetadata({
    title: post?.title,
    description,
    pageUrl,
    type: 'article',
    image,
  });

  if (!post) {
    return (
      <PageSection id="blog-post">
        <h2 className="section-title">{t('blogPost.notFound')}</h2>
        <p>{t('blogPost.notFoundMessage')}</p>
        <div className="blog-post-actions">
          <BackLink to="/blog">{t('blog.back', { defaultValue: 'Back to blog' })}</BackLink>
        </div>
      </PageSection>
    );
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    image: image ? [image] : undefined,
    datePublished,
    dateModified: datePublished,
  };

  const handleBack = () => {
    navigate('/blog');
  };

  return (
    <PageSection id="blog-post">
      <Helmet>
        <title>{helmetContent.title}</title>
        {helmetContent.meta.map((m, i) => (
          <meta key={i} {...m} />
        ))}
        {helmetContent.link.map((l, i) => (
          <link key={i} {...l} />
        ))}
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>

      <article className="blog-post blog-post--narrow" aria-labelledby="blog-post-title">
        <header className="blog-post-header align-left">
          <h1 id="blog-post-title" className="blog-post-title align-left">
            {post.title}
          </h1>
          <p className="blog-post-date align-left">{post.date}</p>
        </header>

        <div className="blog-post-divider blog-post-divider--wide" aria-hidden="true"></div>

        <MarkdownRenderer blocks={post.contentBlocks || []} />
      </article>

      <div className="blog-post-actions left">
        <BackLink variant="button" onClick={handleBack}>
          {t('blog.back', { defaultValue: 'Back to blog' })}
        </BackLink>
      </div>

      {latestPosts.length > 0 && (
        <div className="latest-posts">
          <h3 className="latest-posts-title">
            {t('blog.latest', { defaultValue: 'Latest posts' })}
          </h3>
          <div className="blog-grid">
            {latestPosts.map((entry) => (
              <BlogCard key={entry.id} post={entry} />
            ))}
          </div>
        </div>
      )}
    </PageSection>
  );
}

export default BlogPost;
