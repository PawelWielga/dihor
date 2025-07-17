import timeline from '../timeline.json'

function Timeline() {
  return (
    <div className="timeline">
      <h4 className="timeline-header">Timeline</h4>
      <div className="timeline-container">
        {timeline.map(({ date, company }, index) => (
          <div key={index} className="timeline-item">
            <div className="company">{company}</div>
            <div className="timeline-dot" />
            <div className="date">{date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
