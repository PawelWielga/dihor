function PageSection({ id, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

export default PageSection;
