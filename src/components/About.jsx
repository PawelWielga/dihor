import Timeline from './Timeline.jsx'

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">About Me</h2>
        <div className="about-content scroll-animate">
          <div className="about-text">
            <h3>Experienced .NET Software Engineer</h3>
            <p>
              With over 8 years of experience in .NET development, I specialize in
              designing and developing desktop, web, and mobile applications. My
              expertise spans complex systems in industrial environments (3D
              printing), banking solutions, and consumer-facing applications.
            </p>
            <p>
              I excel in code analysis and performance-driven refactoring, building
              solutions based on MVVM patterns. My technical arsenal includes CI/CD
              pipelines, Docker containers, asynchronous communication (RabbitMQ,
              SignalR), and interface-driven architectures with dependency
              injection.
            </p>
            <p>
              Currently working at 7N (mBank) developing internal banking
              applications, with previous experience at Zortrax S.A. where I built
              innovative 3D printing software solutions including Z-SUITE and
              Zortrax inCloud platforms.
            </p>
            <div className="skills-section">
              <h4>Commercial</h4>
              <div className="tech-stack">
                <span className="tech-tag">C# .NET</span>
                <span className="tech-tag">WPF</span>
                <span className="tech-tag">Blazor</span>
                <span className="tech-tag">Entity Framework</span>
                <span className="tech-tag">ASP.NET Core</span>
                <span className="tech-tag">Angular</span>
                <span className="tech-tag">RabbitMQ</span>
                <span className="tech-tag">SignalR</span>
                <span className="tech-tag">Docker</span>
              </div>
            </div>
            <div className="skills-section">
              <h4>Home-made Projects</h4>
              <div className="tech-stack">
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">MySQL</span>
              </div>
            </div>
          </div>
        </div>
        <Timeline />
      </div>
    </section>
  )
}

export default About
