import { useEffect, useRef } from 'react';

const STAR_COLORS = [
  'rgba(155, 176, 255,',
  'rgba(170, 191, 255,',
  'rgba(202, 215, 255,',
  'rgba(248, 247, 255,',
  'rgba(255, 244, 234,',
  'rgba(255, 210, 161,',
  'rgba(255, 204, 111,',
];

const STAR_COUNT = 1400;
const SPEED = 0.001;
const INITIAL_Z = 1000;
const COMET_CHANCE = 0.006;
const FADE_START_Z = 800;
const FADE_RANGE = INITIAL_Z - FADE_START_Z;
const MAX_STAR_SIZE = 3.4;
const MAX_PIXEL_RATIO = 1.5;
const MAX_EXPLOSIONS = 3;
const EXPLOSION_COOLDOWN_MS = 120;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createStar(ctx, state) {
  let x, y, z, opacity, baseColor, screenX, screenY, currentSize;

  function init(firstLoad = false) {
    x = (Math.random() - 0.5) * 2000;
    y = (Math.random() - 0.5) * 2000;
    z = firstLoad ? Math.random() * INITIAL_Z : INITIAL_Z;
    baseColor = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  }

  function update() {
    z -= SPEED * INITIAL_Z;
    if (z <= 0) init(false);

    screenX = (x / z) * INITIAL_Z + state.centerX;
    screenY = (y / z) * INITIAL_Z + state.centerY;
    currentSize = ((INITIAL_Z - z) / INITIAL_Z) * MAX_STAR_SIZE;

    if (z > FADE_START_Z) opacity = Math.max(0.22, (INITIAL_Z - z) / FADE_RANGE);
    else opacity = 1;
  }

  function draw() {
    if (screenX >= 0 && screenX <= state.width && screenY >= 0 && screenY <= state.height) {
      ctx.fillStyle = baseColor + opacity + ')';
      ctx.beginPath();
      ctx.arc(screenX, screenY, currentSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  init(true);

  return {
    update,
    draw,
    init,
    get screenX() {
      return screenX;
    },
    get screenY() {
      return screenY;
    },
    get baseColor() {
      return baseColor;
    },
    get currentSize() {
      return currentSize;
    },
  };
}

function createExplosion(ctx, x, y, color = 'rgba(255, 255, 255,', strength = 1) {
  let ringRadius = 1;
  let life = 1.0;
  const particles = [];
  const power = clamp(strength, 0.55, 1.75);
  const ringSpeed = 0.75 + power * 0.42;
  const lifeDecay = 0.011 - power * 0.0022;

  const particleCount = Math.round(36 + power * 34);
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = (Math.random() * 2.5 + 0.5) * power;
    particles.push({
      x: 0,
      y: 0,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      size: (Math.random() * 2.4 + 0.65) * clamp(power, 0.7, 1.7),
      pLife: (0.35 + Math.random() * 1.8) * clamp(power, 0.85, 1.65),
      currentLife: 1.0,
      trail: [],
      trailLength: Math.floor(Math.random() * 4 + 5 + power * 2),
    });
  }

  function update() {
    ringRadius += ringSpeed;
    life -= lifeDecay;

    particles.forEach((p) => {
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > p.trailLength) {
        p.trail.shift();
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.currentLife -= 0.015 / p.pLife;
    });
    return life > 0;
  }

  function draw() {
    ctx.save();
    ctx.translate(x, y);

    ctx.strokeStyle = color + life * clamp(power * 0.48, 0.28, 0.9) + ')';
    ctx.lineWidth = clamp(power * 1.4, 1, 3.2);
    ctx.beginPath();
    ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    particles.forEach((p) => {
      if (p.currentLife <= 0) return;

      if (p.trail.length > 1) {
        const firstPoint = p.trail[0];
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color + p.currentLife * 0.28 + ')';
        ctx.lineWidth = Math.max(0.35, p.size * 1.15);
        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.stroke();
      }

      ctx.fillStyle = color + p.currentLife + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  return { update, draw };
}

function createComet(ctx, state) {
  let x,
    y,
    vx,
    vy,
    life = 1.0;

  function reset() {
    const side = Math.floor(Math.random() * 3);
    if (side === 0) {
      x = -50;
      y = Math.random() * state.height;
      vx = 2.5;
      vy = (Math.random() - 0.5) * 2;
    } else if (side === 1) {
      x = state.width + 50;
      y = Math.random() * state.height;
      vx = -2.5;
      vy = (Math.random() - 0.5) * 2;
    } else {
      x = Math.random() * state.width;
      y = -50;
      vx = (Math.random() - 0.5) * 2;
      vy = 2.5;
    }
    life = 1.0;
  }

  function update() {
    x += vx;
    y += vy;
    life -= 0.004;
    return life > 0;
  }

  function draw() {
    ctx.save();
    const g = ctx.createLinearGradient(x, y, x - vx * 25, y - vy * 25);
    g.addColorStop(0, `rgba(255,255,255,${life * 0.8})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - vx * 18, y - vy * 18);
    ctx.stroke();
    ctx.restore();
  }

  reset();

  return {
    update,
    draw,
    get active() {
      return life > 0;
    },
  };
}

function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = {
      width: 0,
      height: 0,
      centerX: 0,
      centerY: 0,
    };

    let stars = [];
    let comets = [];
    let explosions = [];
    let isVisible = true;
    let lastExplosionAt = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      state.width = Math.max(1, Math.floor(rect.width));
      state.height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(state.width * pixelRatio);
      canvas.height = Math.floor(state.height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      state.centerX = state.width / 2;
      state.centerY = state.height / 2;
      initStars();
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar(ctx, state));
      }
    }

    function handleInteraction(ex, ey) {
      const now = performance.now();
      if (now - lastExplosionAt < EXPLOSION_COOLDOWN_MS) return;

      let closestStar = null;
      let minDist = 72;
      let minDistSq = minDist * minDist;

      stars.forEach((s) => {
        const dx = s.screenX - ex;
        const dy = s.screenY - ey;
        const distSq = dx * dx + dy * dy;
        if (distSq < minDistSq) {
          minDistSq = distSq;
          closestStar = s;
        }
      });

      if (closestStar) {
        lastExplosionAt = now;
        const starScale = clamp((closestStar.currentSize ?? 1) / MAX_STAR_SIZE, 0.2, 1);
        const randomBoost = 0.75 + Math.random() * 0.65;
        const explosionStrength = (0.65 + starScale * 1.35) * randomBoost;

        if (explosions.length >= MAX_EXPLOSIONS) {
          explosions.shift();
        }

        explosions.push(
          createExplosion(
            ctx,
            closestStar.screenX,
            closestStar.screenY,
            closestStar.baseColor,
            explosionStrength
          )
        );
        closestStar.init(false);
      }
    }

    const handlePointerDown = (e) => {
      if (e.target instanceof Element && e.target.closest('#navbar')) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      handleInteraction(e.clientX - rect.left, e.clientY - rect.top);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallax = canvas.style;
      parallax.transform = `translateY(${scrollTop * 0.3}px)`;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);

    const animationRef = { current: null };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });

    function animate() {
      if (!isVisible || document.hidden) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, state.width, state.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      if (Math.random() < COMET_CHANCE) comets.push(createComet(ctx, state));
      for (let i = comets.length - 1; i >= 0; i--) {
        if (!comets[i].update()) {
          comets.splice(i, 1);
        } else {
          comets[i].draw();
        }
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        if (!explosions[i].update()) {
          explosions.splice(i, 1);
        } else {
          explosions[i].draw();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    resize();
    visibilityObserver.observe(canvas);

    if (prefersReducedMotion) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, state.width, state.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      visibilityObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      id="space-canvas"
      ref={canvasRef}
      aria-hidden="true"
      role="img"
      aria-label="Decorative star field animation"
      style={{
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        transform: 'translateZ(0)',
      }}
    />
  );
}

export default HeroBackground;
