import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-content">
          <h3>{t('footer.cta')}</h3>
          <p>{t('footer.summary')}</p>
          <div className="social-links">
            <a href="https://github.com/PawelWielga" title="GitHub" aria-label="GitHub profile (opens in new tab)" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/pawel-wielga/" title="LinkedIn" aria-label="LinkedIn profile (opens in new tab)" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" aria-hidden="true" />
            </a>
            <a href="mailto:-----------@gmail.com" title="Email" aria-label="Send email">
              <i className="fas fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Paweł Wielga. All rights reserved. Built with passion and Vite+React ❤️</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
