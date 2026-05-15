import timeline from '../config/timeline.json';

function sanitizeUrl(url) {
  if (!url) return null;
  const trimmed = String(url).trim();
  if (/^https:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return null;
}

function Timeline() {
  return (
    <div className="timeline">
      <h4 className="timeline-header">Timeline</h4>
      <ul className="timeline-container">
        {timeline.map(({ date, company, website }) => {
          const safeUrl = sanitizeUrl(website);
          return (
            <li key={company} className="timeline-item">
              {safeUrl ? (
                <a href={safeUrl} target="_blank" rel="noopener noreferrer" className="company">
                  {company}
                </a>
              ) : (
                <span className="company">{company}</span>
              )}
              <div className="timeline-dot" />
              <div className="date">{date}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Timeline;
