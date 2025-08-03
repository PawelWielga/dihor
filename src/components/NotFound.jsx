import Particles from './Particles.jsx';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://pawelwielga.dihor.pl';

function NotFound() {
  const { t } = useTranslation();
  const pageUrl = `${SITE_URL}/404`;

  return (
    <section id="not-found" className="not-found">
      <Helmet>
        <title>404 | Page not found</title>
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="404 | Page not found" />
        <meta property="og:description" content="The page you are looking for does not exist." />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

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