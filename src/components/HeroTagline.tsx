import React, { useEffect, useMemo, useRef, useState } from 'react';
// react-typed v2 exports a React component named ReactTyped (and also a default in CJS). Use named import:
import { ReactTyped } from 'react-typed';

type IntrinsicWrapper = keyof React.JSX.IntrinsicElements;

export type HeroTaglineProps = {
  taglines: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
  wrapper?: IntrinsicWrapper;
  className?: string;
  style?: React.CSSProperties & Record<string, string | number>;
};

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const HeroTagline: React.FC<HeroTaglineProps> = React.memo(
  ({
    taglines,
    typeSpeed = 50,
    backSpeed = 30,
    backDelay = 100000,
    startDelay = 0,
    loop = true,
    showCursor = true,
    cursorChar = '_',
    ariaLive = 'polite',
    wrapper = 'p',
    className = '',
    style
  }) => {
    const Wrapper = wrapper as any;

    const strings = useMemo(() => (Array.isArray(taglines) ? taglines.filter(Boolean) : []), [taglines]);

    const [isVisible, setIsVisible] = useState(false);
    const rootRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (!isBrowser) return;
      if (!rootRef.current) return;

      const el = rootRef.current;
      let timeout: number | undefined;

      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            timeout = window.setTimeout(() => setIsVisible(true), 50);
          } else {
            setIsVisible(false);
          }
        },
        { root: null, threshold: 0.1 }
      );
      io.observe(el);

      return () => {
        if (timeout) window.clearTimeout(timeout);
        io.disconnect();
      };
    }, []);

    const ariaLiveText = useMemo(() => {
      if (!strings.length) return '';
      return strings.join(', ');
    }, [strings]);

    const fallbackText = strings[0] ?? '';

    return (
      <section
        ref={rootRef as unknown as React.RefObject<HTMLElement>}
        aria-label="Hero section"
        className="hero-tagline-wrapper"
        style={{
          ...(style || {}),
        }}
      >
        <Wrapper
          className={`tagline ${className}`.trim()}
          style={{
            color: 'var(--hero-tagline-color, var(--text-secondary))',
            fontSize: 'clamp(1.125rem, 2.5vw + 0.2rem, 1.75rem)',
            lineHeight: 1.35,
            maxWidth: '60ch',
            marginBottom: '30px',
            ...(style || {}),
          }}
          aria-live={ariaLive}
          aria-atomic="true"
          data-testid="hero-tagline"
        >
          {isBrowser && isVisible && strings.length > 0 ? (
            <ReactTyped
              key={`${strings.join('|')}::${typeSpeed}-${backSpeed}-${backDelay}-${startDelay}-${loop}-${showCursor}-${cursorChar}`}
              strings={strings}
              typeSpeed={typeSpeed}
              backSpeed={backSpeed}
              backDelay={backDelay}
              startDelay={startDelay}
              loop={loop}
              showCursor={showCursor}
              cursorChar={cursorChar}
            />
          ) : (
            fallbackText
          )}
          <noscript>{fallbackText}</noscript>
          <span className="sr-only" aria-hidden="false" style={{ position: 'absolute', left: '-9999px' }}>
            {ariaLiveText}
          </span>
        </Wrapper>
      </section>
    );
  }
);

HeroTagline.displayName = 'HeroTagline';

export default HeroTagline;