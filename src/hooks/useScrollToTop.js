import { useEffect, useCallback } from 'react';

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

  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { scrollToTop, scrollToElement };
}

export default useScrollToTop;
