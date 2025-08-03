import React from 'react';
import { useTranslation } from 'react-i18next';
import blogPosts from '../data/blogposts/blogposts.js';
import { Link } from 'react-router-dom';

function Blog() {
  const { t } = useTranslation();

  const visiblePosts = Array.isArray(blogPosts)
    ? blogPosts.filter((p) => p.visible)
    : [];

  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title">{t('nav.blog')}</h2>

        {visiblePosts.length === 0 ? (
          <p className="blog-empty">{t('blog.empty', { defaultValue: 'No posts yet. Check back soon.' })}</p>
        ) : (
          <div className="blog-grid">
            {visiblePosts.map((post) => {
              const firstParagraph = Array.isArray(post.content)
                ? post.content.find((b) => b.type === 'paragraph')?.text ?? ''
                : '';
              const preview =
                firstParagraph.length > 180 ? `${firstParagraph.slice(0, 180)}…` : firstParagraph;

              return (
                <article key={post.id} className="blog-card">
                  <Link to={`/blog/${post.id}`} className="blog-card-link" aria-label={post.title}>
                    <div className="blog-image" aria-hidden="true">✦</div>
                    <div className="blog-content">
                      <div className="blog-date">{post.date}</div>
                      <h3>{post.title}</h3>
                      {preview && <p>{preview}</p>}
                      <span className="read-more">
                        {t('blog.readMore', { defaultValue: 'Read more' })}
                      </span>
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
