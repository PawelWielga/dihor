import { projectList } from '../../data/projects';
import RenderCard from './projectCardRenderer.jsx';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { AUTHOR_NAME, SITE_URL } from '../../config/site.js';

function Projects() {
  const { t } = useTranslation();
  const commercial = projectList.filter((p) => p.category === 'commercial');
  const home = projectList.filter((p) => p.category === 'home');

  const pageUrl = `${SITE_URL}/#projects`;
  const description = t('projects.seoDescription');

  return (
    <section id="projects" className="section">
      <Helmet>
        <title>{`Projects | ${AUTHOR_NAME}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Projects | ${AUTHOR_NAME}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <div className="container">
        <h2 className="section-title scroll-animate">{t('projects.title')}</h2>
        <h3 className="section-title scroll-animate">{t('projects.commercial')}</h3>
        <div className="projects-grid">
          {commercial.map((p) => (
            <RenderCard key={p.id} project={p} />
          ))}
        </div>
        <h3 className="section-title scroll-animate">{t('projects.home')}</h3>
        <div className="projects-grid">
          {home.map((p) => (
            <RenderCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
