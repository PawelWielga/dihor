function SectionTitle({ children, as, className = '' }) {
  const Tag = as || 'h2';
  return <Tag className={`section-title ${className}`.trim()}>{children}</Tag>;
}

export default SectionTitle;
