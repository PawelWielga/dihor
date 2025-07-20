import { useParams, Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { blogPostMap } from '../../data/blogposts';

function BlogPostDetails() {
  const { id } = useParams();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const post = blogPostMap[id];

  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <h2>Post not found</h2>
          <Link to="/" className="read-more">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title" style={{ marginTop: '40px' }}>
          {post.title}
        </h2>
        <div className="blog-date" style={{ marginBottom: '20px' }}>{post.date}</div>
        {post.content.map((block, idx) => {
          if (block.type === 'text') {
            return <p key={idx}>{block.text}</p>;
          }
          if (block.type === 'code') {
            return (
              <pre key={idx} style={{ overflowX: 'auto' }}>
                <code className={`language-${block.language}`}>{block.lines.join('\n')}</code>
              </pre>
            );
          }
          if (block.type === 'image') {
            return (
              <img
                key={idx}
                src={`${import.meta.env.BASE_URL}${block.url}`}
                alt={block.alt || ''}
                style={{ maxWidth: '100%', margin: '20px 0' }}
              />
            );
          }
          return null;
        })}
        <Link to="/#blog" className="read-more" style={{ display: 'inline-block', marginTop: '20px' }}>
          <i className="fas fa-arrow-left" /> Back to blog
        </Link>
      </div>
    </section>
  );
}

export default BlogPostDetails;
