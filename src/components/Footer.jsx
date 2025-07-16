import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-content">
          <h3>{t('footer.cta')}</h3>
          <p>
            {t('footer.summary')}
          </p>
          <div className="social-links">
            <a href="#" title="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="#" title="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            <a href="#" title="Stack Overflow">
              <i className="fab fa-stack-overflow" />
            </a>
            <a href="mailto:-----------@gmail.com" title="Email">
              <i className="fas fa-envelope" />
            </a>
            <a href="tel:+48---------" title="Phone">
              <i className="fas fa-phone" />
            </a>
          </div>
          <div className="cta-buttons">
            <a href="mailto::-----------@gmail.com" className="btn btn-primary">
              <i className="fas fa-paper-plane" />
              {t('footer.getInTouch')}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Paweł Wielga. All rights reserved. Built with passion and .NET ❤️</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
