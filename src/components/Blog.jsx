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
          <p>{t('blog.empty', { defaultValue: 'No posts yet. Check back soon.' })}</p>
        ) : (
          <div className="blog-list" style={{ display: 'grid', gap: 16 }}>
            {visiblePosts.map((post) => (
              <article key={post.id} className="blog-card" style={{ border: '1px solid #333', borderRadius: 8, padding: 16 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                <small style={{ color: '#aaa' }}>{post.date}</small>
                {Array.isArray(post.content) && post.content.length > 0 ? (
                  <p style={{ marginTop: 8 }}>
                    {post.content.find((b) => b.type === 'paragraph')?.text?.slice(0, 140) ?? ''}
                    {post.content.find((b) => b.type === 'paragraph')?.text?.length > 140 ? '…' : ''}
                  </p>
                ) : null}
                <div style={{ marginTop: 8 }}>
                  <Link to={`/blog/${post.id}`}>{t('blog.readMore', { defaultValue: 'Read more' })}</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
