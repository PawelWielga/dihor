import { Link, useNavigate } from 'react-router-dom'
import { projectList } from '../projects'

function Projects() {
  const navigate = useNavigate()

  const renderCard = project => (
    <div
      key={project.id}
      className="project-card scroll-animate"
      onClick={() => project.hasDetails && navigate(`/project/${project.id}`)}
    >
      <div className="project-type">{project.type}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map(t => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.map(link => (
          <a key={link.label} href="#" onClick={e => e.stopPropagation()}>
            <i className={link.icon} /> {link.label}
          </a>
        ))}
        {project.hasDetails && (
          <Link
            to={`/project/${project.id}`}
            className="details-link"
            onClick={e => e.stopPropagation()}
          >
            <i className="fas fa-info-circle" /> Details
          </Link>
        )}
      </div>
    </div>
  )

  const commercial = projectList.filter(p => p.category === 'commercial')
  const home = projectList.filter(p => p.category === 'home')

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">My Projects</h2>
        <h3 className="section-title scroll-animate">Commercial Projects</h3>
        <div className="projects-grid">{commercial.map(renderCard)}</div>
        <h3 className="section-title scroll-animate">Home Projects</h3>
        <div className="projects-grid">{home.map(renderCard)}</div>
      </div>
    </section>
  )
}

export default Projects
