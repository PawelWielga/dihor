import HeroBackground from './HeroBackground.jsx';

function Hero() {
  return (
    <section id="home" className="hero hero--minimal" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="container">
        <div className="hero-content hero-content--single">
          <div className="hero-text">
            <h1 id="hero-title">Paweł Wielga</h1>
            <p className="hero-kicker">.NET Developer & Software Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
