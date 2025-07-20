import { blogPostList } from '../data/blogposts';
import { Link } from 'react-router-dom';

function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Latest Blog Posts</h2>
        <div className="blog-grid">
          {blogPostList.map((post) => (
            <article key={post.id} className="blog-card scroll-animate">
              <div className="blog-image">
                <i className="fas fa-file-alt" />
              </div>
              <div className="blog-content">
                <div className="blog-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <Link to={`/blog/${post.id}`} className="read-more">
                  Read More <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
