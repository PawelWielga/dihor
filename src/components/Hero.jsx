import Particles from './Particles.jsx'
import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()
  return (
    <section id="home" className="hero">
      <Particles />
      <div className="container">
        <div className="hero-content">
          <div className="hero-image">
            <div className="profile-img">
              <img src={`${import.meta.env.BASE_URL}img/me.jpg`} alt="Paweł Wielga" />
            </div>
          </div>
          <div className="hero-text">
            <h1>Paweł Wielga</h1>
            <p className="tagline">{t('hero.tagline')}</p>
            <p className="subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="cta-buttons">
              <a href="#projects" className="btn btn-primary">
                <i className="fas fa-laptop-code" />
                {t('hero.viewWork')}
              </a>
              <a href="#contact" className="btn btn-secondary">
                <i className="fas fa-envelope" />
                {t('hero.getInTouch')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
