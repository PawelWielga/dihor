// import Timeline from './Timeline.jsx'
import skills from '../config/skills.json';

function About() {
  const { commercial, home } = skills;
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">About Me</h2>
        <div className="about-content scroll-animate">
          <div className="about-text">
            <h3>Experienced .NET Software Engineer</h3>
            <p>
              With over 8 years of experience in .NET development, I specialize in designing and
              developing desktop, web, and mobile applications. My expertise spans complex systems
              in industrial environments (3D printing), banking solutions, and consumer-facing
              applications.
            </p>
            <p>
              I excel in code analysis and performance-driven refactoring, building solutions based
              on MVVM patterns. My technical arsenal includes CI/CD pipelines, Docker containers,
              asynchronous communication (RabbitMQ, SignalR), and interface-driven architectures
              with dependency injection.
            </p>
            <p>
              Currently working at 7N (mBank) developing internal banking applications, with
              previous experience at Zortrax S.A. where I built innovative 3D printing software
              solutions including Z-SUITE and Zortrax inCloud platforms.
            </p>
            <div className="skills-section">
              <h4>Commercial</h4>
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
              <h4>Home-made Projects</h4>
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
