function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline-container">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="date">Summer 2017</div>
            <div className="company">Local Tech Company</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="date">2018 - 2019</div>
            <div className="company">WebDev Agency</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="date">2019 - 2021</div>
            <div className="company">StartupXYZ</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="date">2021 - 2023</div>
            <div className="company">Digital Solutions Ltd</div>
          </div>
        </div>
        <div className="timeline-item current">
          <div className="timeline-dot" />
          <div className="current-label">CURRENT</div>
          <div className="timeline-content">
            <div className="date">2023 - Present</div>
            <div className="company">Tech Innovation Corp</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
