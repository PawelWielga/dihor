import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type CSSProperties,
  type ElementType,
} from 'react';
import { ReactTyped } from 'react-typed';

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
  wrapper?: ElementType;
  className?: string;
  style?: CSSProperties;
};

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const HeroTagline: FC<HeroTaglineProps> = React.memo(
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
    wrapper: Wrapper = 'p',
    className = '',
    style,
  }) => {
    const strings = useMemo(
      () => (Array.isArray(taglines) ? taglines.filter(Boolean) : []),
      [taglines]
    );

    const [isVisible, setIsVisible] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isBrowser) return;
      if (!rootRef.current) return;

      const el = rootRef.current;
      let timeout: ReturnType<typeof setTimeout> | undefined;

      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            timeout = setTimeout(() => setIsVisible(true), 50);
          } else {
            setIsVisible(false);
          }
        },
        { root: null, threshold: 0.1 }
      );
      io.observe(el);

      return () => {
        if (timeout) clearTimeout(timeout);
        io.disconnect();
      };
    }, []);

    const ariaLiveText = useMemo(() => {
      if (!strings.length) return '';
      return strings.join(', ');
    }, [strings]);

    const fallbackText = strings[0] ?? '';

    return (
      <div ref={rootRef} className="hero-tagline-wrapper">
        <Wrapper
          className={`tagline ${className}`}
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
          <span className="sr-only">{ariaLiveText}</span>
        </Wrapper>
      </div>
    );
  }
);

HeroTagline.displayName = 'HeroTagline';

export default HeroTagline;
