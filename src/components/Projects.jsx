import { Link, useNavigate } from 'react-router-dom'

function Projects() {
  const navigate = useNavigate()

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">My Projects</h2>
        <h3 className="section-title scroll-animate">Commercial Projects</h3>
        <div className="projects-grid">
          <div
            className="project-card scroll-animate"
            onClick={() => navigate('/project/z-suite')}
          >
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
              <a href="#" onClick={e => e.stopPropagation()}>
                <i className="fas fa-cube" /> 3D Printing
              </a>
              <Link
                to="/project/z-suite"
                className="details-link"
                onClick={e => e.stopPropagation()}
              >
                <i className="fas fa-desktop" /> Details
              </Link>
            </div>
          </div>

          <div
            className="project-card scroll-animate"
            onClick={() => navigate('/project/incloud')}
          >
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
              <a href="#" onClick={e => e.stopPropagation()}>
                <i className="fas fa-cloud" /> Cloud
              </a>
              <Link
                to="/project/incloud"
                className="details-link"
                onClick={e => e.stopPropagation()}
              >
                <i className="fas fa-globe" /> Details
              </Link>
            </div>
          </div>
        </div>
        <h3 className="section-title scroll-animate">Home Projects</h3>
        <div className="projects-grid">

          <div className="project-card scroll-animate">
            <div className="project-type">Banking Application</div>
            <h3>Internal Banking Systems - mBank</h3>
            <p>
              Developed internal banking applications to streamline operational
              workflows. Migrated business logic from T-SQL stored procedures to
              C# services with comprehensive testing.
            </p>
            <div className="project-tech">
              <span>C# .NET</span>
              <span>T-SQL</span>
              <span>WPF</span>
              <span>MudBlazor</span>
              <span>TeamCity</span>
              <span>Octopus Deploy</span>
            </div>
            <div className="project-links">
              <a href="#">
                <i className="fas fa-university" /> Banking
              </a>
              <a href="#">
                <i className="fas fa-cogs" /> Enterprise
              </a>
            </div>
          </div>

          <div className="project-card scroll-animate">
            <div className="project-type">Mobile Application</div>
            <h3>Nie Ma Nudy - Family Attractions App</h3>
            <p>
              Mobile app aggregating family-friendly attractions across Poland.
              Features location-based search, detailed venue information, and
              personalized favorites list with comprehensive admin panel.
            </p>
            <div className="project-tech">
              <span>.NET Core</span>
              <span>Blazor</span>
              <span>.NET MAUI</span>
              <span>Angular</span>
              <span>Web API</span>
              <span>MySQL</span>
              <span>Entity Framework</span>
            </div>
            <div className="project-links">
              <a href="#">
                <i className="fas fa-mobile-alt" /> Mobile App
              </a>
              <a href="#">
                <i className="fas fa-map-marker-alt" /> Location Based
              </a>
            </div>
          </div>

          <div className="project-card scroll-animate">
            <div className="project-type">Mobile Application</div>
            <h3>ShowSize - Garment Measurement Tool</h3>
            <p>
              Android app for interactive garment measurement annotation.
              Users can select clothing types and add measurements directly on
              silhouettes with customizable labels and image export
              functionality.
            </p>
            <div className="project-tech">
              <span>C# .NET</span>
              <span>Xamarin.Forms</span>
              <span>SkiaSharp</span>
              <span>MVVM</span>
              <span>Android</span>
            </div>
            <div className="project-links">
              <a href="#">
                <i className="fas fa-tshirt" /> Garment Tool
              </a>
              <a href="#">
                <i className="fas fa-ruler" /> Measurements
              </a>
            </div>
          </div>

          <div className="project-card scroll-animate">
            <div className="project-type">Desktop Utilities</div>
            <h3>Material Calibration Tools</h3>
            <p>
              Desktop utilities for 3D printing material calibration with
              extensive parameter editing, toolpath previews, file comparison,
              and parameter history logging for enhanced material testing
              workflows.
            </p>
            <div className="project-tech">
              <span>C#</span>
              <span>Windows Forms</span>
              <span>WPF</span>
              <span>File Processing</span>
            </div>
            <div className="project-links">
              <a href="#">
                <i className="fas fa-tools" /> Calibration
              </a>
              <a href="#">
                <i className="fas fa-microscope" /> Analysis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
