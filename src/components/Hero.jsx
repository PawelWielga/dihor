import Particles from './Particles.jsx'

function Hero() {
  return (
    <section id="home" className="hero">
      <Particles />
      <div className="container">
        <div className="hero-content">
          <h1>Paweł Wielga</h1>
          <p className="tagline">Building powerful .NET solutions</p>
          <p className="subtitle">
            Software Engineer with over 8 years of experience in .NET technologies.
            Specialized in desktop, web, and mobile applications for industrial
            environments, banking, and consumer solutions.
          </p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-laptop-code" />
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-envelope" />
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
