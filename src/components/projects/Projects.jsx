import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { projectList } from '../../data/projects';
import PageSection from '../PageSection.jsx';
import SectionTitle from '../SectionTitle.jsx';
import RenderCard from './projectCardRenderer.jsx';
import useSeoMetadata from '../../hooks/useSeoMetadata.js';
import { SITE_URL } from '../../config/site.js';

function Projects() {
  const { t } = useTranslation();
  const commercial = projectList.filter((p) => p.category === 'commercial');
  const home = projectList.filter((p) => p.category === 'home');

  const description = t('projects.seoDescription');
  const pageUrl = `${SITE_URL}/#projects`;

  const { helmetContent } = useSeoMetadata({
    title: 'Projects',
    description,
    pageUrl,
  });

  return (
    <PageSection id="projects">
      <Helmet>
        <title>{helmetContent.title}</title>
        {helmetContent.meta.map((m, i) => (
          <meta key={i} {...m} />
        ))}
        {helmetContent.link.map((l, i) => (
          <link key={i} {...l} />
        ))}
      </Helmet>

      <SectionTitle>{t('projects.title')}</SectionTitle>
      <SectionTitle as="h3">{t('projects.commercial')}</SectionTitle>
      <div className="projects-grid">
        {commercial.map((p) => (
          <RenderCard key={p.id} project={p} />
        ))}
      </div>
      <SectionTitle as="h3">{t('projects.home')}</SectionTitle>
      <div className="projects-grid">
        {home.map((p) => (
          <RenderCard key={p.id} project={p} />
        ))}
      </div>
    </PageSection>
  );
}

export default Projects;
