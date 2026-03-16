import React from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import jsonLang from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import nginx from 'highlight.js/lib/languages/nginx';
import ini from 'highlight.js/lib/languages/ini';
import php from 'highlight.js/lib/languages/php';
import 'highlight.js/styles/github-dark.css';

const hasLanguage = (name) => Boolean(hljs.getLanguage(name));

function registerLanguage(name, impl) {
  if (!hasLanguage(name)) {
    hljs.registerLanguage(name, impl);
  }
}

registerLanguage('javascript', javascript);
registerLanguage('js', javascript);
registerLanguage('typescript', typescript);
registerLanguage('ts', typescript);
registerLanguage('json', jsonLang);
registerLanguage('xml', xml);
registerLanguage('html', xml);
registerLanguage('css', css);
registerLanguage('bash', bash);
registerLanguage('sh', bash);
registerLanguage('nginx', nginx);
registerLanguage('ini', ini);
registerLanguage('php', php);

function sanitizeHref(url) {
  const value = String(url || '').trim();
  if (/^(https?:\/\/|mailto:|\/)/i.test(value)) {
    return value;
  }
  return '#';
}

function sanitizeImageSrc(url) {
  const value = String(url || '').trim();
  if (/^(https?:\/\/|\/)/i.test(value)) {
    return value;
  }
  return '';
}

function renderInline(text) {
  const source = String(text || '');
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;

  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = tokenRegex.exec(source)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(source.slice(lastIndex, match.index));
      key += 1;
    }

    const token = match[0];

    if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(<code key={`inline-code-${key}`}>{token.slice(1, -1)}</code>);
      key += 1;
    } else if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={`inline-strong-${key}`}>{token.slice(2, -2)}</strong>);
      key += 1;
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(<em key={`inline-em-${key}`}>{token.slice(1, -1)}</em>);
      key += 1;
    } else if (token.startsWith('![')) {
      const imageMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const alt = imageMatch[1];
        const src = sanitizeImageSrc(imageMatch[2]);
        if (src) {
          nodes.push(
            <img
              key={`inline-image-${key}`}
              src={src}
              alt={alt}
              className="blog-inline-image"
              loading="lazy"
              decoding="async"
            />,
          );
        } else {
          nodes.push(token);
        }
        key += 1;
      } else {
        nodes.push(token);
        key += 1;
      }
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const href = sanitizeHref(linkMatch[2]);
        const external = /^https?:\/\//i.test(href);
        nodes.push(
          <a
            key={`inline-link-${key}`}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {label}
          </a>,
        );
        key += 1;
      } else {
        nodes.push(token);
        key += 1;
      }
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < source.length) {
    nodes.push(source.slice(lastIndex));
  }

  return nodes;
}

function highlightCode(text, lang) {
  const safeLang = String(lang || 'plaintext').toLowerCase();
  try {
    if (hljs.getLanguage(safeLang)) {
      return hljs.highlight(text, { language: safeLang }).value;
    }
    return hljs.highlightAuto(text).value;
  } catch {
    return text;
  }
}

function MarkdownRenderer({ blocks, className = 'blog-post-content' }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const level = Math.min(4, Math.max(2, Number(block.level) || 2));
          const Tag = `h${level}`;
          return (
            <Tag key={`heading-${index}`} className={`blog-subtitle h${level}`}>
              {renderInline(block.text)}
            </Tag>
          );
        }

        if (block.type === 'paragraph') {
          return <p key={`paragraph-${index}`}>{renderInline(block.text)}</p>;
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote key={`blockquote-${index}`} className="blog-blockquote">
              {renderInline(block.text)}
            </blockquote>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={`ul-${index}`} className="blog-list">
              {block.items.map((item, itemIndex) => (
                <li key={`ul-item-${index}-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={`ol-${index}`} className="blog-list blog-list-ordered">
              {block.items.map((item, itemIndex) => (
                <li key={`ol-item-${index}-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        if (block.type === 'code') {
          const rawLang = String(block.lang || 'plaintext');
          const lang = rawLang.toLowerCase();
          const label = rawLang.toUpperCase();
          const html = highlightCode(String(block.text || ''), lang);

          return (
            <div key={`code-${index}`} className="code-block-wrapper">
              <div className="code-lang">{label}</div>
              <pre className="code-block">
                <code
                  className={`language-${lang}`}
                  data-lang={lang}
                  aria-label={`Code example in ${label}`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </pre>
            </div>
          );
        }

        if (block.type === 'image') {
          const src = sanitizeImageSrc(block.src);
          if (!src) {
            return null;
          }
          return (
            <figure key={`image-${index}`} className="blog-image-block">
              <img
                src={src}
                alt={block.alt || ''}
                className="blog-block-image"
                loading="lazy"
                decoding="async"
              />
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

export default MarkdownRenderer;
