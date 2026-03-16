import Particles from './Particles.jsx';
import { useTranslation } from 'react-i18next';
import HeroTagline from './HeroTagline.tsx';

function Hero() {
  const { t } = useTranslation();

  // Source hero.tagline variants from i18n or a config/CMS.
  // If your i18n provides a single string, we create a one-item array as fallback.
  const taglineConfig = t('hero.tagline', { returnObjects: true });
  const taglineArray = Array.isArray(taglineConfig) ? taglineConfig : [t('hero.tagline')];

  // Slower, natural cadence; key forces remount to ensure new timings take effect
  const typingProps = {
    typeSpeed: 30,
    backSpeed: 12,
    backDelay: 100000,
    startDelay: 300,
    loop: true,
    showCursor: true,
    cursorChar: '_'
  };

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Particles />
      <div className="container">
        <div className="hero-content">
          <div className="hero-image">
            <div className="profile-img">
              <img
                src={`${import.meta.env.BASE_URL}img/me.jpg`}
                alt="Portrait of Paweł Wielga"
                width="240"
                height="240"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
          <div className="hero-text">
            <h1 id="hero-title">Paweł Wielga</h1>

            {/* Accessible, responsive animated tagline */}
            <HeroTagline
              key={JSON.stringify({ strings: taglineArray, ...typingProps })}
              taglines={taglineArray}
              typeSpeed={typingProps.typeSpeed}
              backSpeed={typingProps.backSpeed}
              backDelay={typingProps.backDelay}
              startDelay={typingProps.startDelay}
              loop={typingProps.loop}
              showCursor={typingProps.showCursor}
              cursorChar={typingProps.cursorChar}
              ariaLive="polite"
              wrapper="p"
              className="tagline"
            />

            <p className="subtitle">{t('hero.subtitle')}</p>
            <div className="cta-buttons">
              <a href="#projects" className="btn btn-primary">
                <i className="fas fa-laptop-code" aria-hidden="true" />
                {t('hero.viewWork')}
              </a>
              <a href="#contact" className="btn btn-secondary">
                <i className="fas fa-envelope" aria-hidden="true" />
                {t('hero.getInTouch')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
