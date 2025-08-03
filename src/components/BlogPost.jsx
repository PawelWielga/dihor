import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
        <article className="blog-post">
          <header className="blog-post-header">
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-date">{post.date}</p>
          </header>
          <div className="blog-post-content">
            {Array.isArray(post.content) ? (
              post.content.map((block, idx) => {
                if (block.type === 'paragraph') {
                  return <p key={idx}>{block.text}</p>;
                }
                if (block.type === 'code') {
                  const lang = (block.lang || 'plaintext').toLowerCase();
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
                  return (
                    <pre key={idx} className="code-block">
                      <code className={className} data-lang={lang} dangerouslySetInnerHTML={{ __html: html }} />
                    </pre>
                  );
                }
                return null;
              })
            ) : (
              <p>{post.content}</p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export default BlogPost;