import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import skills from '../config/skills.json';
import { SITE_URL, AUTHOR_NAME } from '../config/site.js';
import PageSection from './PageSection.jsx';
import SectionTitle from './SectionTitle.jsx';
import SkillsDisplay from './SkillsDisplay.jsx';
import useSeoMetadata from '../hooks/useSeoMetadata.js';

function About() {
  const { t } = useTranslation();
  const { commercial, home } = skills;
  const { helmetContent } = useSeoMetadata({
    title: 'About',
    description: t('about.seoDescription'),
    pageUrl: `${SITE_URL}/#about`,
  });

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: '.NET Developer & Software Engineer',
    sameAs: ['https://github.com/PawelWielga', 'https://www.linkedin.com/in/pawel-wielga/'],
  };

  return (
    <PageSection id="about">
      <Helmet>
        <title>{helmetContent.title}</title>
        {helmetContent.meta.map((m, i) => (
          <meta key={i} {...m} />
        ))}
        {helmetContent.link.map((l, i) => (
          <link key={i} {...l} />
        ))}
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </Helmet>

      <SectionTitle>{t('about.title')}</SectionTitle>
      <div className="about-content scroll-animate">
        <div className="about-text">
          <h3>{t('about.subtitle')}</h3>
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          <p>{t('about.paragraph3')}</p>
          <SkillsDisplay skills={commercial} labelKey="about.commercialSkills" />
          <SkillsDisplay skills={home} labelKey="about.homeSkills" />
        </div>
      </div>
    </PageSection>
  );
}

export default About;
