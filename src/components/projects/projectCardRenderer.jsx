import { Link, useNavigate } from 'react-router-dom';

function RenderCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      key={project.id}
      className="project-card scroll-animate"
      onClick={() => project.hasDetails && navigate(`/project/${project.id}`)}
    >
      <div className="project-type">{project.type}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.map((link) => (
          <a key={link.label} href="#" onClick={(e) => e.stopPropagation()}>
            <i className={link.icon} /> {link.label}
          </a>
        ))}
        {project.hasDetails && (
          <Link
            to={`/project/${project.id}`}
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
