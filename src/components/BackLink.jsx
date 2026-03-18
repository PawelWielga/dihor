import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BackLink({ to, onClick, children, variant = 'button', className = '' }) {
  const { t } = useTranslation();
  const defaultLabel = children || t('blog.back', '← Back');

  if (variant === 'button') {
    return (
      <button type="button" onClick={onClick} className={`btn back-btn ${className}`}>
        {defaultLabel}
      </button>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={`back-link ${className}`}>
      {defaultLabel}
    </Link>
  );
}

export default BackLink;
