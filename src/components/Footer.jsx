function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-content">
          <h3>Let's Build Something Amazing Together</h3>
          <p>
            Experienced in industrial, banking, and consumer applications. Ready to
            bring technical excellence and innovative solutions to your next .NET
            project.
          </p>
          <div className="social-links">
            <a href="#" title="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="#" title="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            <a href="#" title="Stack Overflow">
              <i className="fab fa-stack-overflow" />
            </a>
            <a href="mailto:-----------@gmail.com" title="Email">
              <i className="fas fa-envelope" />
            </a>
            <a href="tel:+48---------" title="Phone">
              <i className="fas fa-phone" />
            </a>
          </div>
          <div className="cta-buttons">
            <a href="mailto::-----------@gmail.com" className="btn btn-primary">
              <i className="fas fa-paper-plane" />
              Get In Touch
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Paweł Wielga. All rights reserved. Built with passion and .NET ❤️</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
