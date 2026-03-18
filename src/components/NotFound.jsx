import Particles from './Particles.jsx';
import { useTranslation } from 'react-i18next';
import { SITE_URL } from '../config/site.js';
import useSeoMetadata from '../hooks/useSeoMetadata.js';

function NotFound() {
  const { t } = useTranslation();

  useSeoMetadata({
    title: '404',
    description: 'The page you are looking for does not exist.',
    pageUrl: `${SITE_URL}/404`,
    noIndex: true,
  });

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
