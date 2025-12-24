import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

/**
 * Simplex Noise implementation (3D)
 */
const createNoise3D = () => {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [p[i], p[r]] = [p[r], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
  ];

  const dot3 = (g: number[], x: number, y: number, z: number) => g[0] * x + g[1] * y + g[2] * z;

  return (x: number, y: number, z: number) => {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = x - X0;
    const y0 = y - Y0;
    const z0 = z - Z0;

    let i1, j1, k1;
    let i2, j2, k2;

    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    const gi0 = perm[ii + perm[jj + perm[kk]]] % 12;
    const gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12;
    const gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12;
    const gi3 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    let n0 = 0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot3(grad3[gi0], x0, y0, z0); }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    let n1 = 0;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot3(grad3[gi1], x1, y1, z1); }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    let n2 = 0;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot3(grad3[gi2], x2, y2, z2); }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    let n3 = 0;
    if (t3 >= 0) { t3 *= t3; n3 = t3 * t3 * dot3(grad3[gi3], x3, y3, z3); }

    return 32.0 * (n0 + n1 + n2 + n3);
  };
};

const CFDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise3D = useRef(createNoise3D()).current;
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Respect reduced motion preference for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Draw static background only
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = themeRef.current === 'dark' ? '#050810' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return; // Skip animation entirely
    }

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let time = 0;
    let resizeTimeout: number;

    const PARTICLE_COUNT = 1200;
    const TRAIL_LENGTH = 16;
    const TIME_STEP = 0.002;
    const BASE_VELOCITY_X = 1.8;

    let mouseX = -1000;
    let mouseY = -1000;

    // --- DARK MODE LUT (Vibrant Rainbow) ---
    const DARK_STOPS = [
      { t: 0.0, r: 40, g: 5, b: 5 },
      { t: 0.15, r: 220, g: 20, b: 20 },
      { t: 0.3, r: 255, g: 140, b: 0 },
      { t: 0.45, r: 255, g: 215, b: 0 },
      { t: 0.6, r: 50, g: 205, b: 50 },
      { t: 0.75, r: 0, g: 191, b: 255 },
      { t: 0.9, r: 30, g: 60, b: 255 },
      { t: 1.0, r: 138, g: 43, b: 226 },
    ];

    // --- LIGHT MODE LUT (Rainbow on Light) ---
    const LIGHT_STOPS = [
      { t: 0.0, r: 255, g: 235, b: 235 },
      { t: 0.15, r: 239, g: 68, b: 68 },
      { t: 0.3, r: 249, g: 115, b: 22 },
      { t: 0.45, r: 234, g: 179, b: 8 },
      { t: 0.6, r: 34, g: 197, b: 94 },
      { t: 0.75, r: 6, g: 182, b: 212 },
      { t: 0.9, r: 59, g: 130, b: 246 },
      { t: 1.0, r: 168, g: 85, b: 247 },
    ];

    const LUT_SIZE = 200;
    const darkLUT: { r: number, g: number, b: number }[] = [];
    const lightLUT: { r: number, g: number, b: number }[] = [];

    const generateLUT = (stops: any[], output: any[]) => {
      for (let i = 0; i <= LUT_SIZE; i++) {
        const t = i / LUT_SIZE;
        let start = stops[0];
        let end = stops[stops.length - 1];
        for (let j = 0; j < stops.length - 1; j++) {
          if (t >= stops[j].t && t <= stops[j + 1].t) {
            start = stops[j];
            end = stops[j + 1];
            break;
          }
        }
        const range = end.t - start.t;
        const localT = (t - start.t) / range;
        const smoothT = localT < 0.5 ? 4 * localT * localT * localT : 1 - Math.pow(-2 * localT + 2, 3) / 2;

        output.push({
          r: Math.floor(start.r + (end.r - start.r) * smoothT),
          g: Math.floor(start.g + (end.g - start.g) * smoothT),
          b: Math.floor(start.b + (end.b - start.b) * smoothT),
        });
      }
    };

    generateLUT(DARK_STOPS, darkLUT);
    generateLUT(LIGHT_STOPS, lightLUT);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      history: { x: number, y: number }[];
      age: number;
      lifespan: number;

      constructor(randomStart = true) {
        this.x = randomStart ? Math.random() * width : -50;
        this.y = Math.random() * height;
        this.vx = BASE_VELOCITY_X;
        this.vy = 0;
        this.history = [];
        this.age = Math.random() * 200;
        this.lifespan = 400 + Math.random() * 400;
      }

      getPotential(x: number, y: number, t: number) {
        const flowSpeed = 0.8;
        const advectedX = x * 0.002 - t * flowSpeed;
        const scaleY = y * 0.002;
        let val = 0;
        val += noise3D(advectedX, scaleY, t * 0.15) * 15;
        val += noise3D(advectedX * 3.0, scaleY * 3.0, t * 0.4) * 4;

        const dx = x - mouseX;
        const dy = Math.abs(y - mouseY);
        if (dx > 0 && dx < 500 && dy < 100 + dx * 0.25) {
          const wakeIntensity = (1 - dx / 500);
          const shedding = Math.sin(x * 0.02 - t * 10.0) * Math.cos(y * 0.05);
          val += noise3D(x * 0.015, y * 0.015, t * 2.5) * 8 * wakeIntensity * (1 + shedding);
        }
        return val;
      }

      update(t: number) {
        this.age++;
        const eps = 2.0;
        const n1 = this.getPotential(this.x, this.y, t);
        const n2 = this.getPotential(this.x, this.y + eps, t);
        const n3 = this.getPotential(this.x + eps, this.y, t);

        const dy = (n2 - n1) / eps;
        const dx = (n3 - n1) / eps;

        const normalizedY = this.y / height;
        const shearProfile = Math.sin(Math.pow(normalizedY, 0.8) * Math.PI);
        const baseVx = BASE_VELOCITY_X * (0.5 + 0.8 * shearProfile);

        const targetVx = baseVx + dy * 1.5;
        const targetVy = -dx * 1.5;

        // Inertia / Lag
        const LAG_FACTOR = 0.15;
        this.vx += (targetVx - this.vx) * LAG_FACTOR;
        this.vy += (targetVy - this.vy) * LAG_FACTOR;

        // Turbulence
        this.vx += (Math.random() - 0.5) * 0.05;
        this.vy += (Math.random() - 0.5) * 0.05;

        const mdx = this.x - mouseX;
        const mdy = this.y - mouseY;
        const distSq = mdx * mdx + mdy * mdy;
        const radius = 150;

        if (distSq < radius * radius) {
          const dist = Math.sqrt(distSq);
          const force = Math.pow((radius - dist) / radius, 3);
          this.vx += (mdx / dist) * force * 2.0;
          this.vy += (mdy / dist) * force * 2.0;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > TRAIL_LENGTH) this.history.shift();

        if (this.x > width + 100 || this.y > height + 50 || this.y < -50 || this.age > this.lifespan) {
          this.reset();
        }
      }

      reset() {
        const seedLeft = Math.random() > 0.02;
        this.x = seedLeft ? -Math.random() * 100 : Math.random() * width;
        this.y = Math.random() * height;
        this.vx = BASE_VELOCITY_X;
        this.vy = 0;
        this.history = [];
        this.age = 0;
        this.lifespan = 400 + Math.random() * 400;
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        if (this.history.length < 2) return;

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        let t = (speed - 0.5) / 3.5;
        if (t < 0) t = 0;
        if (t > 1) t = 1;

        const colorIdx = Math.floor(t * LUT_SIZE);
        const LUT = isDark ? darkLUT : lightLUT;
        const c = LUT[colorIdx] || LUT[LUT_SIZE];

        const fadeIn = Math.min(this.age / 20, 1);
        const fadeOut = Math.min((this.lifespan - this.age) / 60, 1);
        let alpha = Math.min(fadeIn, fadeOut);

        // SUBTLETY ADJUSTMENT: Significantly reduced max opacity for both modes
        if (isDark) {
          alpha = alpha * 0.30; // Was 0.5
        } else {
          alpha = alpha * 0.25 + 0.02; // Was 0.4 + 0.05
        }

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length - 1; i++) {
          const xc = (this.history[i].x + this.history[i + 1].x) / 2;
          const yc = (this.history[i].y + this.history[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.history[i].x, this.history[i].y, xc, yc);
        }
        ctx.lineTo(this.history[this.history.length - 1].x, this.history[this.history.length - 1].y);

        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        // Thinner lines for a more delicate, high-end feel
        ctx.lineWidth = Math.max(0.5, 1.8 - t * 1.0);
        ctx.stroke();
      }
    }

    const particles: Particle[] = [];

    // Throttled resize to prevent browser lag
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }, 100) as unknown as number;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(true));
      }
    };

    const animate = () => {
      time += TIME_STEP;
      const isDark = themeRef.current === 'dark';

      if (isDark) {
        // Slightly higher opacity clear to ensure trails don't build up too much opacity
        ctx.fillStyle = 'rgba(5, 8, 16, 0.28)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(148, 163, 184, 0.02)';
        const GRID_X = 120;
        const GRID_Y = 80;
        for (let x = 0; x < width; x += GRID_X) ctx.fillRect(x, 0, 1, height);
        for (let y = 0; y < height; y += GRID_Y) ctx.fillRect(0, y, width, 1);

        ctx.globalCompositeOperation = 'screen';
      } else {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.45)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(148, 163, 184, 0.05)';
        const GRID_X = 120;
        const GRID_Y = 80;
        for (let x = 0; x < width; x += GRID_X) ctx.fillRect(x, 0, 1, height);
        for (let y = 0; y < height; y += GRID_Y) ctx.fillRect(0, y, width, 1);

        ctx.globalCompositeOperation = 'multiply';
      }

      particles.forEach(p => {
        p.update(time);
        p.draw(ctx, isDark);
      });
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};

export default CFDBackground;
