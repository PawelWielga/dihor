import Card from '../Card.jsx';

function RenderCard({ project }) {
  return (
    <Card
      id={project.id}
      type="project"
      title={project.title}
      description={project.description}
      tech={project.tech}
      links={project.links}
      hasDetails={project.hasDetails}
      productUrl={project.productUrl}
      productLabel={project.productLabel}
      productIcon={project.productIcon}
      url={project.isBlogPost ? `/blog/${project.id}` : `/project/${project.id}`}
      meta={{
        type: project.type,
        company: project.company,
      }}
    />
  );
}

export default RenderCard;
