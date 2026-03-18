import HeroBackground from './HeroBackground.jsx';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
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

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 - Page Not Found',
    url: `${SITE_URL}/404`,
    description: 'The page you are looking for does not exist.',
    statusCode: 404,
  };

  return (
    <section id="not-found" className="not-found">
      <HeroBackground />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(webPageLd)}</script>
      </Helmet>
      <div className="not-found-content">
        <h1>404</h1>
        <p>{t('notFound.message')}</p>
        <a href="/" className="btn btn-primary">
          <i className="fas fa-home" aria-hidden="true" />
          {t('notFound.goHome')}
        </a>
      </div>
    </section>
  );
}

export default NotFound;
