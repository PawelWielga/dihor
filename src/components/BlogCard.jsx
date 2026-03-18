import Card from './Card.jsx';

function BlogCard({ post, index }) {
  return (
    <Card
      id={post.id}
      type="blog"
      title={post.title}
      excerpt={post.excerpt}
      image={post.image}
      date={post.date}
      itemScope
      itemType="https://schema.org/BlogPosting"
      itemProp="itemListElement"
      index={index}
    />
  );
}

export default BlogCard;
