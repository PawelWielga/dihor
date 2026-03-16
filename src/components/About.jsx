// import Timeline from './Timeline.jsx'
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import skills from '../config/skills.json';
import { AUTHOR_NAME, SITE_URL } from '../config/site.js';

function About() {
  const { t } = useTranslation();
  const { commercial, home } = skills;
  const description = t('about.seoDescription');
  const pageUrl = `${SITE_URL}/#about`;

  return (
    <section id="about" className="section">
      <Helmet>
        <title>{`About | ${AUTHOR_NAME}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`About | ${AUTHOR_NAME}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <div className="container">
        <h2 className="section-title scroll-animate">{t('about.title')}</h2>
        <div className="about-content scroll-animate">
          <div className="about-text">
            <h3>{t('about.subtitle')}</h3>
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <p>{t('about.paragraph3')}</p>
            <div className="skills-section">
              <h4>{t('about.commercialSkills')}</h4>
              <div className="skill-group">
                <div className="tech-stack">
                  {commercial.flatMap(({ class: cls, skills: list }) =>
                    list.map((skill) => (
                      <span key={`${cls}-${skill}`} className={`tech-tag ${cls}`}>
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="skills-section">
              <h4>{t('about.homeSkills')}</h4>
              <div className="skill-group">
                <div className="tech-stack">
                  {home.flatMap(({ class: cls, skills: list }) =>
                    list.map((skill) => (
                      <span key={`${cls}-${skill}`} className={`tech-tag ${cls}`}>
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Timeline /> */}
      </div>
    </section>
  );
}

export default About;
