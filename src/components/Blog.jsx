import React from 'react';
import { useTranslation } from 'react-i18next';

function Blog() {
  const { t } = useTranslation();

  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title">{t('nav.blog')}</h2>
        <p>This is the blog page. Blog posts will be listed here.</p>
        {/* Blog posts will be rendered here */}
      </div>
    </section>
  );
}

export default Blog;
