import { projectList } from '../../projects';
import RenderCard from './projectCardRenderer.jsx';

function Projects() {
  const commercial = projectList.filter((p) => p.category === 'commercial');
  const home = projectList.filter((p) => p.category === 'home');

  return (
    <section id="projects" className="section">
      <div className="container">
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
