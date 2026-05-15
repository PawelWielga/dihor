import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BackLink({ to = '/', onClick, children, variant = 'link', className = '' }) {
  const { t } = useTranslation();
  const defaultLabel = children || t('blog.back', 'Back');

  if (variant === 'button') {
    return (
      <Link to={to} onClick={onClick} className={`btn back-btn ${className}`}>
        {defaultLabel}
      </Link>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={`back-link ${className}`}>
      {defaultLabel}
    </Link>
  );
}

export default BackLink;
