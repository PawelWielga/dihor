import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import blogPosts from '../data/blogposts/blogposts.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import jsonLang from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/github-dark.css';

function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Register common languages once
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('js', javascript);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('ts', typescript);
  hljs.registerLanguage('json', jsonLang);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', xml);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('sh', bash);

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

  // Compute newest posts (visible only), excluding current, take up to 3
  const latestPosts = useMemo(() => {
    const list = Array.isArray(blogPosts) ? blogPosts.filter((p) => p.visible && p.id !== id) : [];
    // If posts contain a date, you could sort here. For now, keep array order as "newest first".
    return list.slice(0, 3);
  }, [id]);

  if (!post) {
    return (
      <section className="section" style={{ minHeight: '100vh' }}>
        <div className="container">
          <h2 className="section-title">{t('blogPost.notFound')}</h2>
          <p>{t('blogPost.notFoundMessage')}</p>
          <div className="blog-post-actions">
            <Link to="/#blog" className="btn btn-secondary back-btn">{t('blog.back', { defaultValue: 'Back to blog' })}</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ minHeight: '100vh' }}>
      <div className="container">
        <article className="blog-post blog-post--narrow">
          <header className="blog-post-header align-left">
            <h1 className="blog-post-title align-left">{post.title}</h1>
            <p className="blog-post-date align-left">{post.date}</p>
          </header>

          {/* Divider line above first paragraph - full content width */}
          <div className="blog-post-divider blog-post-divider--wide" aria-hidden="true"></div>

          <div className="blog-post-content">
            {Array.isArray(post.content) ? (
              post.content.map((block, idx) => {
                if (block.type === 'paragraph') {
                  return <p key={idx}>{block.text}</p>;
                }
                if (block.type === 'code') {
                  const rawLang = (block.lang || 'plaintext');
                  const lang = rawLang.toLowerCase();
                  const className = `language-${lang}`;
                  let html;
                  try {
                    if (hljs.getLanguage(lang)) {
                      html = hljs.highlight(block.text, { language: lang }).value;
                    } else {
                      html = hljs.highlightAuto(block.text).value;
                    }
                  } catch {
                    html = block.text;
                  }
                  const label = rawLang.toUpperCase();
                  return (
                    <div key={idx} className="code-block-wrapper">
                      <div className="code-lang">{label}</div>
                      <pre className="code-block">
                        <code className={className} data-lang={lang} dangerouslySetInnerHTML={{ __html: html }} />
                      </pre>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <p>{post.content}</p>
            )}
          </div>
        </article>

        {/* Back button below blog post container, aligned left */}
        <div className="blog-post-actions left">
          <button
            type="button"
            className="btn btn-secondary back-btn"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/#blog');
              }
            }}
          >
            {t('blog.back', { defaultValue: 'Back to blog' })}
          </button>
        </div>

        {/* Latest posts section */}
        {latestPosts.length > 0 && (
          <div className="latest-posts">
            <h3 className="latest-posts-title">
              {t('blog.latest', { defaultValue: 'Latest posts' })}
            </h3>
            <div className="blog-grid">
              {latestPosts.map((p) => {
                const firstParagraph = Array.isArray(p.content)
                  ? p.content.find((b) => b.type === 'paragraph')?.text ?? ''
                  : '';
                const preview =
                  firstParagraph.length > 140 ? `${firstParagraph.slice(0, 140)}…` : firstParagraph;

                return (
                  <article key={p.id} className="blog-card">
                    <Link to={`/blog/${p.id}`} className="blog-card-link" aria-label={p.title}>
                      <div className="blog-image" aria-hidden="true">✦</div>
                      <div className="blog-content">
                        <div className="blog-date">{p.date}</div>
                        <h3>{p.title}</h3>
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
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPost;