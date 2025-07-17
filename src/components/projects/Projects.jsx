import { Link, useNavigate } from 'react-router-dom'
import { projectList } from '../../projects'
import { RenderCard } from 'src/components/projects/projectCardRenderer.js'

function Projects() {
  const navigate = useNavigate()

  const commercial = projectList.filter(p => p.category === 'commercial')
  const home = projectList.filter(p => p.category === 'home')

  return (
    <section id="projects" className="section">
      <div className="container">
        <h3 className="section-title scroll-animate">Commercial Projects</h3>
        <div className="projects-grid">{commercial.map(renderCard)}</div>
        <h3 className="section-title scroll-animate">Home Projects</h3>
        <div className="projects-grid">{home.map(renderCard)}</div>
      </div>
    </section>
  )
}

export default Projects
