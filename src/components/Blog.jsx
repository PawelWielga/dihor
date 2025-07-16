function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Latest Blog Posts</h2>
        <div className="blog-grid">
          <article className="blog-card glass scroll-animate">
            <div className="blog-image">
              <i className="fas fa-cube" />
            </div>
            <div className="blog-content">
              <div className="blog-date">June 10, 2025</div>
              <h3>3D Printing Software: Lessons from Z-SUITE Development</h3>
              <p>
                Deep dive into building desktop applications for 3D printing,
                covering 3D transformations, collision detection, and optimal
                model orientation algorithms.
              </p>
              <a href="#" className="read-more">
                Read More <i className="fas fa-arrow-right" />
              </a>
            </div>
          </article>

          <article className="blog-card glass scroll-animate">
            <div className="blog-image">
              <i className="fas fa-university" />
            </div>
            <div className="blog-content">
              <div className="blog-date">June 5, 2025</div>
              <h3>Migrating from T-SQL to C# Services in Banking</h3>
              <p>
                Practical insights from migrating complex business logic from
                stored procedures to maintainable C# services in enterprise
                banking environments.
              </p>
              <a href="#" className="read-more">
                Read More <i className="fas fa-arrow-right" />
              </a>
            </div>
          </article>

          <article className="blog-card glass scroll-animate">
            <div className="blog-image">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="blog-content">
              <div className="blog-date">May 28, 2025</div>
              <h3>Building Cross-Platform Apps with .NET MAUI</h3>
              <p>
                My experience building "Nie Ma Nudy" - from concept to production,
                covering .NET MAUI, Blazor integration, and location-based
                features.
              </p>
              <a href="#" className="read-more">
                Read More <i className="fas fa-arrow-right" />
              </a>
            </div>
          </article>

          <article className="blog-card glass scroll-animate">
            <div className="blog-image">
              <i className="fas fa-cogs" />
            </div>
            <div className="blog-content">
              <div className="blog-date">May 20, 2025</div>
              <h3>MVVM and DDD Patterns in Industrial Applications</h3>
              <p>
                How architectural patterns like MVVM and Domain-Driven Design
                helped build robust, maintainable solutions in complex industrial
                environments.
              </p>
              <a href="#" className="read-more">
                Read More <i className="fas fa-arrow-right" />
              </a>
            </div>
          </article>

          <article className="blog-card glass scroll-animate">
            <div className="blog-image">
              <i className="fas fa-cloud" />
            </div>
            <div className="blog-content">
              <div className="blog-date">May 15, 2025</div>
              <h3>Real-time Communication with SignalR and RabbitMQ</h3>
              <p>
                Building responsive applications with asynchronous communication
                patterns, covering implementation strategies and performance
                considerations.
              </p>
              <a href="#" className="read-more">
                Read More <i className="fas fa-arrow-right" />
              </a>
            </div>
          </article>

          <article className="blog-card glass scroll-animate">
            <div className="blog-image">
              <i className="fas fa-paint-brush" />
            </div>
            <div className="blog-content">
              <div className="blog-date">May 8, 2025</div>
              <h3>Custom Graphics with SkiaSharp in Xamarin</h3>
              <p>
                Creating interactive touch interfaces and custom visualizations
                using SkiaSharp, based on experience building the ShowSize
                measurement app.
              </p>
              <a href="#" className="read-more">
                Read More <i className="fas fa-arrow-right" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Blog
