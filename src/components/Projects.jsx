import { Link } from 'react-router-dom'

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">My Projects</h2>
        <div className="projects-grid">
          <div className="project-card scroll-animate">
            <div className="project-type">Desktop Application</div>
            <h3>Z-SUITE - 3D Printing Software</h3>
            <p>
              Desktop application with embedded browser for 3D model loading,
              manipulation, print setting selection, support generation, slicing,
              and toolpath computation. Built core 3D transformations and
              optimization algorithms.
            </p>
            <div className="project-tech">
              <span>C# .NET</span>
              <span>WPF</span>
              <span>CefSharp</span>
              <span>AngularJS</span>
              <span>Three.js</span>
              <span>JavaScript</span>
            </div>
            <div className="project-links">
              <a href="#">
                <i className="fas fa-cube" /> 3D Printing
              </a>
              <Link to="/project/z-suite" className="details-link">
                <i className="fas fa-desktop" /> Details
              </Link>
            </div>
          </div>

          <div className="project-card scroll-animate">
            <div className="project-type">Web Application</div>
            <h3>Zortrax inCloud - Remote Printer Management</h3>
            <p>
              Web application for remote 3D printer management with real-time
              status monitoring, job control, and data collection. Implemented
              virtual shelves feature for printer organization.
            </p>
            <div className="project-tech">
              <span>.NET Core</span>
              <span>Entity Framework</span>
              <span>TypeScript</span>
              <span>Angular</span>
              <span>RabbitMQ</span>
              <span>SignalR</span>
              <span>MongoDB</span>
            </div>
            <div className="project-links">
              <a href="#">
                <i className="fas fa-cloud" /> Cloud
              </a>
              <Link to="/project/incloud" className="details-link">
                <i className="fas fa-globe" /> Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
