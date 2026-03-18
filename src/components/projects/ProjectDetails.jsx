import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MarkdownRenderer from '../MarkdownRenderer.jsx';
import PageSection from '../PageSection.jsx';
import BackLink from '../BackLink.jsx';
import useScrollToTop from '../../hooks/useScrollToTop.js';
import { projectMap, projectDetailsMap } from '../../data/projects';

function ProjectDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  useScrollToTop({ behavior: 'smooth' });

  const project = projectMap[id];
  const projectDetails = projectDetailsMap[id];

  if (!project) {
    return (
      <PageSection id="project-details">
        <h2 className="section-title">{t('projectDetails.notFound')}</h2>
        <BackLink to="/" className="read-more">
          {t('projectDetails.backToHome')}
        </BackLink>
      </PageSection>
    );
  }

  return (
    <PageSection id="project-details">
      <article className="blog-post blog-post--narrow">
        <h2 className="section-title">{projectDetails?.title || project.title}</h2>
        <p>{project.description}</p>
        <div className="project-tech">
          {(project.tech || []).map((tech) => (
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
      <BackLink to="/#projects" className="read-more project-back-link">
        {t('projectDetails.backToProjects')}
      </BackLink>
    </PageSection>
  );
}

export default ProjectDetails;
