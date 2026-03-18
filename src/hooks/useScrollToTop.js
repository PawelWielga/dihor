import { useEffect, useCallback, useRef } from 'react';

export function useScrollToTop({ behavior = 'instant', delays = [0] } = {}) {
  const scrollToTop = useCallback(() => {
    delays.forEach((delay) => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: behavior,
        });
      }, delay);
    });
  }, [behavior, delays]);

  const scrollToElement = useCallback((elementOrId) => {
    const element =
      typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToTopRef = useRef(scrollToTop);

  useEffect(() => {
    scrollToTopRef.current = scrollToTop;
  }, [scrollToTop]);

  useEffect(() => {
    scrollToTopRef.current();
  }, []);

  return { scrollToTop, scrollToElement };
}

export default useScrollToTop;
