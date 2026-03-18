import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
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

  const handleClick = () => {
    if (hasDetails) {
      navigate(cardUrl);
    }
  };

  return (
    <article
      ref={cardRef}
      className="card glass scroll-animate"
      onClick={handleClick}
      itemScope={itemScope}
      itemType={itemType}
      itemProp={itemProp}
    >
      {image && (
        <div className="card-image" aria-hidden="true">
          <img
            src={image}
            alt={`Thumbnail for ${title}`}
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
                <i className={link.icon} /> {link.label}
              </span>
            ))}
          </div>
        )}

        {hasDetails && (
          <Link to={cardUrl} className="card-details-link" onClick={(e) => e.stopPropagation()}>
            <i className="fas fa-info-circle" /> Details
          </Link>
        )}

        {!hasDetails && <span className="card-read-more">Read more</span>}
      </div>

      {itemScope && <meta itemProp="mainEntityOfPage" content={`${SITE_URL}${cardUrl}`} />}
    </article>
  );
}

export default Card;
