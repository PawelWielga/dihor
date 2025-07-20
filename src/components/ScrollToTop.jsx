import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // ensure the page always starts at the top after navigation
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      const isDesktop = window.innerWidth >= 1024;
      if (!atTop && isDesktop) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-top-btn${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}

export default ScrollToTop;
