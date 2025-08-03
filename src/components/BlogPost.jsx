import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import blogPosts from '../data/blogposts'; // Assuming blog posts data is here

function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();

  // Ensure we land at the very top on route change and after paint on mobile
  useEffect(() => {
    // Immediate scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Fallback after layout/paint (addresses mobile browsers restoring scroll)
    const t1 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    // Extra fallback shortly after (for iOS/Android history restoration)
    const t2 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [id]);

  // Find the blog post by ID
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <section className="section" style={{ minHeight: '100vh' }}>
        <div className="container">
          <h2 className="section-title">{t('blogPost.notFound')}</h2>
          <p>{t('blogPost.notFoundMessage')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h2 className="section-title">{post.title}</h2>
        <p className="blog-post-date">{post.date}</p>
        <div className="blog-post-content">
          {/* Render blog post content here */}
          <p>{post.content}</p>
        </div>
      </div>
    </section>
  );
}

export default BlogPost;