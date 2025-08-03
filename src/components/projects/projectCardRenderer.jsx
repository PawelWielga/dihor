import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import useCenteredHighlight from '../../hooks/useCenteredHighlight.js';

function RenderCard({ project }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  useCenteredHighlight(cardRef);

  return (
    <div
      key={project.id}
      ref={cardRef}
      className="project-card glass scroll-animate"
      onClick={() =>
        project.hasDetails &&
        navigate(project.isBlogPost ? `/blog/${project.id}` : `/project/${project.id}`)
      }
    >
      <div className="project-type">{project.type}</div>
      {project.company && <div className="project-company">{project.company}</div>}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.map((link) => (
          <span key={link.label}>
            <i className={link.icon} /> {link.label}
          </span>
        ))}
        {project.hasDetails && (
          <Link
            to={project.isBlogPost ? `/blog/${project.id}` : `/project/${project.id}`}
            className="details-link"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fas fa-info-circle" /> Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default RenderCard;
