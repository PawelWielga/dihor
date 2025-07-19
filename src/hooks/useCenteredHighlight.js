import { useEffect } from 'react';

export default function useCenteredHighlight(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const options = {
      root: null,
      // shrink viewport to center 10% to detect when the card's middle enters
      // that zone. threshold 0 ensures any overlap triggers the highlight
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('center-highlight');
        } else {
          entry.target.classList.remove('center-highlight');
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [ref]);
}
