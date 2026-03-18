import PropTypes from 'prop-types';
import Card from './Card.jsx';
import { SITE_URL } from '../config/site.js';

function BlogCard({ post }) {
  return (
    <Card
      id={post.id}
      type="blog"
      title={post.title}
      excerpt={post.excerpt}
      image={post.image || `${SITE_URL}/img/me.jpg`}
      date={post.date}
      hasDetails={true}
      url={`/blog/${post.id}`}
      itemScope
      itemType="https://schema.org/BlogPosting"
      itemProp="itemListElement"
    />
  );
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default BlogCard;
