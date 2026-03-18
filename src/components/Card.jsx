import { Link, useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SITE_URL } from '../config/site.js';
import useCenteredHighlight from '../hooks/useCenteredHighlight.js';

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
  url,
  meta = {},
  itemScope,
  itemType,
  itemProp,
}) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  useCenteredHighlight(cardRef);

  const cardUrl = url || (type === 'blog' ? `/blog/${id}` : `/project/${id}`);

  const handleClick = useCallback(() => {
    if (hasDetails) {
      navigate(cardUrl);
    }
  }, [hasDetails, cardUrl, navigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (hasDetails) {
          navigate(cardUrl);
        }
      }
    },
    [hasDetails, cardUrl, navigate]
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
      tabIndex={hasDetails ? 0 : -1}
      role={hasDetails ? 'button' : undefined}
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
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div className="card-links">
            {links.map((link) => (
              <span key={link.label}>
                <i className={link.icon} aria-hidden="true" /> {link.label}
              </span>
            ))}
          </div>
        )}

        {hasDetails && (
          <Link to={cardUrl} className="card-details-link" onClick={handleLinkClick}>
            <i className="fas fa-info-circle" /> Details
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
