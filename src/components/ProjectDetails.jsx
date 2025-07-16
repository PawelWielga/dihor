import { useParams, Link } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

const projects = {
  'z-suite': {
    title: 'Z-SUITE - 3D Printing Software',
    description:
      'Desktop application with embedded browser for 3D model loading, manipulation, print setting selection, support generation, slicing and toolpath computation.',
    tech: ['C# .NET', 'WPF', 'CefSharp', 'AngularJS', 'Three.js', 'JavaScript'],
  },
  incloud: {
    title: 'Zortrax inCloud - Remote Printer Management',
    description:
      'Web application for remote 3D printer management with real-time status monitoring, job control and data collection.',
    tech: [
      '.NET Core',
      'Entity Framework',
      'TypeScript',
      'Angular',
      'RabbitMQ',
      'SignalR',
      'MongoDB',
    ],
  },
}

function ProjectDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])
  const project = projects[id]

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
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{project.title}</h2>
        <p>{project.description}</p>
        <div className="project-tech" style={{ marginTop: '20px' }}>
          {project.tech.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <Link
          to="/#projects"
          className="read-more"
          style={{ display: 'inline-block', marginTop: '20px' }}
        >
          {t('projectDetails.backToProjects')}
        </Link>
      </div>
    </section>
  )
}

export default ProjectDetails
