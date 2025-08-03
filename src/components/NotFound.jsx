import Particles from './Particles.jsx';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <section id="not-found" className="not-found">
      <Particles />
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <p>{t('notFound.message')}</p>
          <a href="/" className="btn btn-primary">
            {t('notFound.goHome')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default NotFound;