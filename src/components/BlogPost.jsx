import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { blogPosts, blogPostMap } from '../content/index.js';
import MarkdownRenderer from './MarkdownRenderer.jsx';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';

function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const t1 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    const t2 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [id]);

  const post = blogPostMap[id];

  const latestPosts = useMemo(() => {
    const list = Array.isArray(blogPosts) ? blogPosts.filter((entry) => entry.visible && entry.id !== id) : [];
    return list.slice(0, 3);
  }, [id]);

  if (!post) {
    return (
      <section className="section" style={{ minHeight: '100vh' }}>
        <div className="container">
          <h2 className="section-title">{t('blogPost.notFound')}</h2>
          <p>{t('blogPost.notFoundMessage')}</p>
          <div className="blog-post-actions">
            <Link to="/blog" className="btn btn-secondary back-btn">
              {t('blog.back', { defaultValue: 'Back to blog' })}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const pageUrl = `${SITE_URL}/blog/${post.id}`;
  const description = post.excerpt || '';
  const image = post.image?.startsWith('http')
    ? post.image
    : post.image
      ? `${SITE_URL}${post.image}`
      : `${SITE_URL}/img/me.jpg`;
  const datePublished = post.dateISO || post.date || undefined;

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

  return (
    <section className="section" style={{ minHeight: '100vh' }}>
      <Helmet>
        <title>
          {post.title} | {AUTHOR_NAME}
        </title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={post.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>

      <div className="container">
        <article className="blog-post blog-post--narrow">
          <header className="blog-post-header align-left">
            <h1 className="blog-post-title align-left">{post.title}</h1>
            <p className="blog-post-date align-left">{post.date}</p>
          </header>

          <div className="blog-post-divider blog-post-divider--wide" aria-hidden="true"></div>

          <MarkdownRenderer blocks={post.contentBlocks} />
        </article>

        <div className="blog-post-actions left">
          <button
            type="button"
            className="btn btn-secondary back-btn"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              setTimeout(() => {
                navigate('/blog');
              }, 0);
            }}
          >
            {t('blog.back', { defaultValue: 'Back to blog' })}
          </button>
        </div>

        {latestPosts.length > 0 && (
          <div className="latest-posts">
            <h3 className="latest-posts-title">{t('blog.latest', { defaultValue: 'Latest posts' })}</h3>
            <div className="blog-grid">
              {latestPosts.map((entry) => (
                <article key={entry.id} className="blog-card">
                  <Link to={`/blog/${entry.id}`} className="blog-card-link" aria-label={entry.title}>
                    <div className="blog-image" aria-hidden="true">
                      {entry.image ? (
                        <img
                          src={entry.image}
                          alt={`Thumbnail for ${entry.title}`}
                          loading="lazy"
                          decoding="async"
                          width="640"
                          height="360"
                        />
                      ) : (
                        '*'
                      )}
                    </div>
                    <div className="blog-content">
                      <div className="blog-date">{entry.date}</div>
                      <h3>{entry.title}</h3>
                      {entry.excerpt && <p>{entry.excerpt}</p>}
                      <span className="read-more">
                        {t('blog.readMore', { defaultValue: 'Read more' })}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPost;
