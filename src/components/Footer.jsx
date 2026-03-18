import { useTranslation } from 'react-i18next';
import SocialLinks from './SocialLinks.jsx';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer id="contact" className="section">
      <div className="container">
        <div className="footer-content">
          <h3>{t('footer.cta')}</h3>
          <p>{t('footer.summary')}</p>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Paweł Wielga. All rights reserved. Built with passion and Vite+React</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
