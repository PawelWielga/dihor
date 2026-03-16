import { useParams, Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownRenderer from '../MarkdownRenderer.jsx';
import { projectMap, projectDetailsMap } from '../../data/projects';

function ProjectDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);
  const project = projectMap[id];
  const projectDetails = projectDetailsMap[id];

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <h2>{t('projectDetails.notFound')}</h2>
          <Link to="/" className="read-more">
            {t('projectDetails.backToHome')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <article className="blog-post blog-post--narrow">
          <h2 className="section-title">{projectDetails?.title || project.title}</h2>
          <p>{project.description}</p>
          <div className="project-tech" style={{ marginTop: '20px' }}>
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          {projectDetails?.contentBlocks?.length > 0 && (
            <>
              <div className="blog-post-divider blog-post-divider--wide" aria-hidden="true"></div>
              <MarkdownRenderer blocks={projectDetails.contentBlocks} />
            </>
          )}
        </article>
        <Link
          to="/#projects"
          className="read-more"
          style={{ display: 'inline-block', marginTop: '20px' }}
        >
          {t('projectDetails.backToProjects')}
        </Link>
      </div>
    </section>
  );
}

export default ProjectDetails;
