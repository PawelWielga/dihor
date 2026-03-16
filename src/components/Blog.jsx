import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../content/index.js';
import { Link } from 'react-router-dom';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';

function Blog() {
  const { t } = useTranslation();

  const visiblePosts = Array.isArray(blogPosts) ? blogPosts.filter((p) => p.visible) : [];

  const pageUrl = `${SITE_URL}/blog`;
  const description = t('blog.seoDescription');

  return (
    <section id="blog" className="section">
      <Helmet>
        <title>{`Blog | ${AUTHOR_NAME}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Blog | ${AUTHOR_NAME}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/img/me.jpg`} />
        <meta property="og:image:alt" content={`Portrait of ${AUTHOR_NAME}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Blog | ${AUTHOR_NAME}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/img/me.jpg`} />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          headline: 'Blog',
          description,
          url: pageUrl,
        })}</script>
      </Helmet>

      <div className="container" itemScope itemType="https://schema.org/Blog">
        <meta itemProp="name" content={`${AUTHOR_NAME} Blog`} />
        <meta itemProp="url" content={pageUrl} />
        <h1 className="section-title">{t('nav.blog')}</h1>
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
          <p className="blog-empty">{t('blog.empty', { defaultValue: 'No posts yet. Check back soon.' })}</p>
        ) : (
          <div className="blog-grid" itemScope itemType="https://schema.org/ItemList">
            <meta itemProp="itemListOrder" content="https://schema.org/ItemListUnordered" />
            {visiblePosts.map((post, index) => {
              const postUrl = `/blog/${post.id}`;
              return (
                <article
                  key={post.id}
                  className="blog-card"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                  itemProp="itemListElement"
                >
                  <meta itemProp="position" content={index + 1} />
                  <Link to={postUrl} className="blog-card-link" aria-label={`Read blog post: ${post.title}`}>
                    <div className="blog-image" aria-hidden="true">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={`Thumbnail for ${post.title}`}
                          loading="lazy"
                          decoding="async"
                          width="640"
                          height="360"
                          itemProp="image"
                        />
                      ) : (
                        '*'
                      )}
                    </div>
                    <div className="blog-content">
                      <div className="blog-date" itemProp="datePublished">{post.date}</div>
                      <h2 itemProp="headline">{post.title}</h2>
                      {post.excerpt && <p itemProp="description">{post.excerpt}</p>}
                      <span className="read-more">
                        {t('blog.readMore', { defaultValue: 'Read more' })}
                      </span>
                      <meta itemProp="mainEntityOfPage" content={`${SITE_URL}${postUrl}`} />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;

