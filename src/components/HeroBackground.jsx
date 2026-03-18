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

const STAR_COUNT = 1000;
const SPEED = 0.0008;
const INITIAL_Z = 1000;
const COMET_CHANCE = 0.002;
const FADE_START_Z = 800;
const FADE_RANGE = INITIAL_Z - FADE_START_Z;
const MAX_STAR_SIZE = 2.5;

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

    if (z > FADE_START_Z) opacity = (INITIAL_Z - z) / FADE_RANGE;
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
  };
}

function createExplosion(ctx, x, y, color) {
  let ringRadius = 1;
  let life = 1.0;
  const particles = [];

  const particleCount = 100;
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = Math.random() * 2.5 + 0.3;
    particles.push({
      x: 0,
      y: 0,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      size: Math.random() * 2 + 0.5,
      pLife: 0.3 + Math.random() * 2.0,
      currentLife: 1.0,
      trail: [],
      trailLength: Math.floor(Math.random() * 8) + 3,
    });
  }

  function update() {
    ringRadius += 0.8;
    life -= 0.005;

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

    ctx.strokeStyle = color + life * 0.3 + ')';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    particles.forEach((p) => {
      if (p.currentLife <= 0) return;

      p.trail.forEach((t, i) => {
        const trailOpacity = (i / p.trail.length) * p.currentLife * 0.6;
        const trailSize = p.size * (i / p.trail.length) * 0.8;
        ctx.fillStyle = color + trailOpacity + ')';
        ctx.beginPath();
        ctx.arc(t.x, t.y, trailSize, 0, Math.PI * 2);
        ctx.fill();
      });

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

    const state = {
      width: 0,
      height: 0,
      centerX: 0,
      centerY: 0,
    };

    let stars = [];
    let comets = [];
    let explosions = [];

    function resize() {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = state.width;
      canvas.height = state.height;
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
      let closestStar = null;
      let minDist = 40;

      stars.forEach((s) => {
        const dx = s.screenX - ex;
        const dy = s.screenY - ey;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closestStar = s;
        }
      });

      if (closestStar) {
        explosions.push(
          createExplosion(ctx, closestStar.screenX, closestStar.screenY, closestStar.baseColor)
        );
        closestStar.init(false);
      }
    }

    canvas.addEventListener('mousedown', (e) => handleInteraction(e.clientX, e.clientY));
    canvas.addEventListener(
      'touchstart',
      (e) => {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: true }
    );

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallax = canvas.style;
      parallax.transform = `translateY(${scrollTop * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    const animationRef = { current: null };

    function animate() {
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
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleInteraction);
      canvas.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleScroll);
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
        transform: 'translateZ(0)',
      }}
    />
  );
}

export default HeroBackground;
