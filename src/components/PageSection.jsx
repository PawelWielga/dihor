function PageSection({ id, children, className = '' }) {
  return (
    <section id={id} className={className ? `section ${className}` : 'section'}>
      <div className="container">{children}</div>
    </section>
  );
}

export default PageSection;
