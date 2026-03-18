import { useEffect, useRef } from 'react';

function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let stars = [];
    let comets = [];
    let explosions = [];
    let centerX, centerY;

    const STAR_COUNT = 1000;
    const SPEED = 0.0008;
    const INITIAL_Z = 1000;
    const COMET_CHANCE = 0.002;

    const STAR_COLORS = [
      'rgba(155, 176, 255,',
      'rgba(170, 191, 255,',
      'rgba(202, 215, 255,',
      'rgba(248, 247, 255,',
      'rgba(255, 244, 234,',
      'rgba(255, 210, 161,',
      'rgba(255, 204, 111,',
    ];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      centerX = width / 2;
      centerY = height / 2;
      initStars();
    }

    class Star {
      constructor() {
        this.init(true);
      }

      init(firstLoad = false) {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = firstLoad ? Math.random() * INITIAL_Z : INITIAL_Z;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = 0;
        this.baseColor = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      }

      update() {
        this.z -= SPEED * INITIAL_Z;
        if (this.z <= 0) this.init(false);

        this.screenX = (this.x / this.z) * INITIAL_Z + centerX;
        this.screenY = (this.y / this.z) * INITIAL_Z + centerY;
        this.currentSize = ((INITIAL_Z - this.z) / INITIAL_Z) * 2.5;

        if (this.z > 800) this.opacity = (INITIAL_Z - this.z) / 200;
        else this.opacity = 1;
      }

      draw() {
        if (
          this.screenX >= 0 &&
          this.screenX <= width &&
          this.screenY >= 0 &&
          this.screenY <= height
        ) {
          ctx.fillStyle = this.baseColor + this.opacity + ')';
          ctx.beginPath();
          ctx.arc(this.screenX, this.screenY, this.currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    class Explosion {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.ringRadius = 1;
        this.life = 1.0;
        this.particles = [];

        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2.5 + 0.3;
          this.particles.push({
            x: 0,
            y: 0,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2 + 0.5,
            pLife: 0.3 + Math.random() * 2.0,
            currentLife: 1.0,
            trail: [],
            trailLength: Math.floor(Math.random() * 8) + 3,
          });
        }
      }

      update() {
        this.ringRadius += 0.8;
        this.life -= 0.005;

        this.particles.forEach((p) => {
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
        return this.life > 0;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.strokeStyle = this.color + this.life * 0.3 + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, this.ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        this.particles.forEach((p) => {
          if (p.currentLife <= 0) return;

          p.trail.forEach((t, i) => {
            const trailOpacity = (i / p.trail.length) * p.currentLife * 0.6;
            const trailSize = p.size * (i / p.trail.length) * 0.8;
            ctx.fillStyle = this.color + trailOpacity + ')';
            ctx.beginPath();
            ctx.arc(t.x, t.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.fillStyle = this.color + p.currentLife + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }
    }

    class Comet {
      constructor() {
        this.reset();
      }
      reset() {
        const side = Math.floor(Math.random() * 3);
        if (side === 0) {
          this.x = -50;
          this.y = Math.random() * height;
          this.vx = 2.5;
          this.vy = (Math.random() - 0.5) * 2;
        } else if (side === 1) {
          this.x = width + 50;
          this.y = Math.random() * height;
          this.vx = -2.5;
          this.vy = (Math.random() - 0.5) * 2;
        } else {
          this.x = Math.random() * width;
          this.y = -50;
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = 2.5;
        }
        this.life = 1.0;
        this.active = true;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.004;
        if (this.life <= 0) this.active = false;
      }
      draw() {
        ctx.save();
        const g = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - this.vx * 25,
          this.y - this.vy * 25
        );
        g.addColorStop(0, `rgba(255,255,255,${this.life * 0.8})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 18, this.y - this.vy * 18);
        ctx.stroke();
        ctx.restore();
      }
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
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
          new Explosion(closestStar.screenX, closestStar.screenY, closestStar.baseColor)
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

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallax = canvas.style;
      parallax.transform = `translateY(${scrollTop * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    function animate() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      if (Math.random() < COMET_CHANCE) comets.push(new Comet());
      for (let i = comets.length - 1; i >= 0; i--) {
        comets[i].update();
        comets[i].draw();
        if (!comets[i].active) comets.splice(i, 1);
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        if (!explosions[i].update()) {
          explosions.splice(i, 1);
        } else {
          explosions[i].draw();
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleInteraction);
      canvas.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      id="space-canvas"
      ref={canvasRef}
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
