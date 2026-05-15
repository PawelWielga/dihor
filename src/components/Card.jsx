import { Link, useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { SITE_URL } from '../config/site.js';
import useCenteredHighlight from '../hooks/useCenteredHighlight.js';
import { getTechCategory } from '../utils/techCategories.js';

function Card({
  id,
  type = 'blog',
  title,
  description,
  excerpt,
  image,
  date,
  tech = [],
  links = [],
  hasDetails = false,
  productUrl,
  productLabel,
  productIcon,
  url,
  meta = {},
  itemScope,
  itemType,
  itemProp,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  useCenteredHighlight(cardRef);

  const cardUrl = url || (type === 'blog' ? `/blog/${id}` : `/project/${id}`);

  const productLink =
    productUrl ||
    links.find((link) => Boolean(link.url) && (link.external || /^https?:\/\//i.test(link.url)));
  const resolvedProductUrl = typeof productLink === 'string' ? productLink : productLink?.url;
  const resolvedProductLabel =
    productLabel ||
    (typeof productLink === 'object' ? productLink.label : undefined) ||
    t('projects.actions.product');
  const resolvedProductIcon =
    productIcon || (typeof productLink === 'object' ? productLink.icon : undefined) || 'fas fa-external-link-alt';
  const isProject = type === 'project';
  const isClickableCard = hasDetails && !isProject;

  const handleClick = useCallback(() => {
    if (isClickableCard) {
      navigate(cardUrl);
    }
  }, [isClickableCard, cardUrl, navigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isClickableCard) {
          navigate(cardUrl);
        }
      }
    },
    [isClickableCard, cardUrl, navigate]
  );

  const handleLinkClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <article
      ref={cardRef}
      className="card glass scroll-animate"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickableCard ? 0 : -1}
      role={isClickableCard ? 'button' : undefined}
      itemScope={itemScope}
      itemType={itemType}
      itemProp={itemProp}
    >
      {image && (
        <div className="card-image" aria-hidden="true">
          <img
            src={image}
            alt={type === 'blog' ? `Blog thumbnail for: ${title}` : `Project thumbnail: ${title}`}
            loading="lazy"
            decoding="async"
            width="640"
            height="360"
            itemProp="image"
          />
        </div>
      )}

      <div className="card-content">
        {date && (
          <div className="card-date" itemProp="datePublished">
            {date}
          </div>
        )}

        {meta.type && <div className="card-type">{meta.type}</div>}
        {meta.company && <div className="card-company">{meta.company}</div>}

        <h3 className="card-title" itemProp="headline">
          {title}
        </h3>

        {excerpt && (
          <p className="card-excerpt" itemProp="description">
            {excerpt}
          </p>
        )}

        {description && <p className="card-description">{description}</p>}

        {tech.length > 0 && (
          <div className="card-tech">
            {tech.map((t) => (
              <span key={t} className={getTechCategory(t)}>
                {t}
              </span>
            ))}
          </div>
        )}

        {links.filter((link) => !link.url).length > 0 && (
          <div className="card-links">
            {links.filter((link) => !link.url).map((link) => (
              <span key={link.label}>
                <i className={link.icon} aria-hidden="true" /> {link.label}
              </span>
            ))}
          </div>
        )}

        {isProject && (hasDetails || resolvedProductUrl) && (
          <div className="card-actions">
            {hasDetails && (
              <Link to={cardUrl} className="card-action card-action-primary" onClick={handleLinkClick}>
                <i className="fas fa-align-left" aria-hidden="true" />
                {t('projects.actions.details')}
              </Link>
            )}

            {resolvedProductUrl && (
              <a
                href={resolvedProductUrl}
                className="card-action card-action-secondary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                <i className={resolvedProductIcon} aria-hidden="true" />
                {resolvedProductLabel}
              </a>
            )}
          </div>
        )}

        {!isProject && hasDetails && (
          <Link to={cardUrl} className="card-details-link" onClick={handleLinkClick}>
            <i className="fas fa-info-circle" aria-hidden="true" />
            {t('blog.readMore')}
          </Link>
        )}
      </div>

      {itemScope && <meta itemProp="mainEntityOfPage" content={`${SITE_URL}${cardUrl}`} />}
    </article>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['blog', 'project']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  excerpt: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  tech: PropTypes.arrayOf(PropTypes.string),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      url: PropTypes.string,
      external: PropTypes.bool,
    })
  ),
  hasDetails: PropTypes.bool,
  productUrl: PropTypes.string,
  productLabel: PropTypes.string,
  productIcon: PropTypes.string,
  url: PropTypes.string,
  meta: PropTypes.shape({
    type: PropTypes.string,
    company: PropTypes.string,
  }),
  itemScope: PropTypes.bool,
  itemType: PropTypes.string,
  itemProp: PropTypes.string,
};

export default Card;
