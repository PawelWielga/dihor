import React, { useMemo } from 'react';

function Particles({ count = 80 }) {
  // Precompute particle attributes once for stable animation and performance
  const particlesData = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Size variation: 1px to 4px with slight bias toward smaller dots
      const baseSize = 1 + Math.random() * 3; // 1..4
      // Transparency variation: softer near 0.15..0.6
      const opacity = 0.15 + Math.random() * 0.45;
      // Decrease max speed by increasing overall durations (slower movement)
      const duration = 8 + Math.random() * 12; // 8..20s
      // Optional delay for more randomness
      const delay = -(Math.random() * duration); // negative so particles already in-motion
      // Randomly blur some particles to add depth
      const shouldBlur = Math.random() < 0.35; // ~35% blurred
      const blurAmount = shouldBlur ? (0.3 + Math.random() * 1.2) : 0; // 0.3px..1.5px
      // Blue hue variation around site accent
      // If your theme exposes more color vars, we try them first, then fallback to accent-cyan.
      const palette = [
        'var(--accent-blue, #3b82f6)',     // Tailwind-ish blue-500 fallback
        'var(--accent-cyan, #06b6d4)',     // current accent
        'var(--accent-sky, #0ea5e9)',      // sky-500 fallback
        'var(--accent-indigo, #6366f1)'    // indigo-500 fallback
      ];
      const color = palette[Math.floor(Math.random() * palette.length)];

      return {
        size: baseSize,
        opacity,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration,
        delay,
        blur: blurAmount,
        color
      };
    });
  }, [count]);

  const particles = particlesData.map((p, i) => {
    const style = {
      position: 'absolute',
      width: `${p.size}px`,
      height: `${p.size}px`,
      background: p.color,
      borderRadius: '50%',
      opacity: p.opacity,
      left: `${p.left}%`,
      top: `${p.top}%`,
      animation: `float ${p.duration}s linear infinite`,
      animationDelay: `${p.delay}s`,
      filter: p.blur ? `blur(${p.blur}px)` : 'none',
      boxShadow: `0 0 ${Math.max(1, p.size)}px ${p.color}` // subtle glow to blend with blue theme
    };
    return <div key={i} style={style} />;
  });

  return (
    <div
      className="particles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {particles}
    </div>
  );
}

export default React.memo(Particles);
