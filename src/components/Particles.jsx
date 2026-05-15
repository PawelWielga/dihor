import { useMemo, memo } from 'react';

const MIN_PARTICLE_SIZE = 1;
const MAX_PARTICLE_SIZE = 4;
const MIN_OPACITY = 0.15;
const MAX_OPACITY = 0.6;
const MIN_DURATION = 8;
const MAX_DURATION = 20;
const BLUR_PROBABILITY = 0.35;
const MIN_BLUR = 0.3;
const MAX_BLUR = 1.5;

const PARTICLE_PALETTE = [
  'var(--accent-blue, #3b82f6)',
  'var(--accent-cyan, #06b6d4)',
  'var(--accent-sky, #0ea5e9)',
  'var(--accent-indigo, #6366f1)',
];

function Particles({ count = 80 }) {
  const particlesData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = MIN_PARTICLE_SIZE + Math.random() * (MAX_PARTICLE_SIZE - MIN_PARTICLE_SIZE);
      const opacity = MIN_OPACITY + Math.random() * (MAX_OPACITY - MIN_OPACITY);
      const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
      const delay = -(Math.random() * duration);
      const shouldBlur = Math.random() < BLUR_PROBABILITY;
      const blurAmount = shouldBlur ? MIN_BLUR + Math.random() * (MAX_BLUR - MIN_BLUR) : 0;
      const color = PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      return {
        size,
        opacity,
        left,
        top,
        duration,
        delay,
        blur: blurAmount,
        color,
        key: `particle-${left.toFixed(2)}-${top.toFixed(2)}-${i}`,
      };
    });
  }, [count]);

  const particles = particlesData.map((p) => {
    const style = {
      '--particle-size': `${p.size}px`,
      '--particle-opacity': p.opacity,
      '--particle-left': `${p.left}%`,
      '--particle-top': `${p.top}%`,
      '--particle-color': p.color,
      '--particle-blur': p.blur ? `${p.blur}px` : 'none',
      animation: `float ${p.duration}s linear infinite`,
      animationDelay: `${p.delay}s`,
    };
    return <div key={p.key} className="particle" style={style} />;
  });

  return <div className="particles">{particles}</div>;
}

export default memo(Particles);
