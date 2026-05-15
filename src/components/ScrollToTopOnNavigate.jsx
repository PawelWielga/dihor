import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnNavigate() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      let frameId;
      let attempts = 0;
      const targetId = decodeURIComponent(hash.slice(1));

      const scrollToHashTarget = () => {
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({ block: 'start' });
          return;
        }

        attempts += 1;
        if (attempts < 10) {
          frameId = window.requestAnimationFrame(scrollToHashTarget);
        }
      };

      frameId = window.requestAnimationFrame(scrollToHashTarget);
      return () => window.cancelAnimationFrame(frameId);
    }

    window.scrollTo(0, 0);
  }, [hash, pathname]);

  return null;
}

export default ScrollToTopOnNavigate;
