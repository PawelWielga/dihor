import timeline from '../timeline.json'

function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline-container">
        {timeline.map(({ date, company, current }, index) => (
          <div
            key={index}
            className={`timeline-item${current ? ' current' : ''}`}
          >
            <div className="timeline-dot" />
            {current && <div className="current-label">CURRENT</div>}
            <div className="timeline-content">
              <div className="date">{date}</div>
              <div className="company">{company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
