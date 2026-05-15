function SectionTitle({ children, as, className = '' }) {
  const Tag = as || 'h2';
  return <Tag className={`section-title ${className}`}>{children}</Tag>;
}

export default SectionTitle;
