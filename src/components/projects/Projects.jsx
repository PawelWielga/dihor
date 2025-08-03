import { projectList } from '../../data/projects';
import RenderCard from './projectCardRenderer.jsx';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://pawelwielga.dihor.pl';

function Projects() {
  const commercial = projectList.filter((p) => p.category === 'commercial');
  const home = projectList.filter((p) => p.category === 'home');

  const pageUrl = `${SITE_URL}/#projects`;
  const description = 'Selected commercial and home projects by Paweł Wielga (.NET, React, DevOps, HomeLab).';

  return (
    <section id="projects" className="section">
      <Helmet>
        <title>Projects | Paweł Wielga</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Projects | Paweł Wielga" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <div className="container">
        <h2 className="section-title scroll-animate">Projects</h2>
        <h3 className="section-title scroll-animate">Commercial Projects</h3>
        <div className="projects-grid">
          {commercial.map((p) => (
            <RenderCard key={p.id} project={p} />
          ))}
        </div>
        <h3 className="section-title scroll-animate">Home Projects</h3>
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
