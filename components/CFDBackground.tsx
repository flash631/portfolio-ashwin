import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeContext';

/**
 * CFD-inspired Flow Simulation Background
 * 
 * Features:
 * - Navier-Stokes inspired velocity field
 * - Interactive mouse/touch flow disturbance
 * - Vortex shedding effects (von Kármán street)
 * - Streamline particle advection
 * - Temperature-based color gradient (cool→warm)
 * - Optimized rendering with adaptive particle count
 */

// Performance-optimized Simplex Noise (3D)
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
  const F3 = 1.0 / 3.0;
  const G3 = 1.0 / 6.0;

  return (x: number, y: number, z: number): number => {
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const X0 = i - t, Y0 = j - t, Z0 = k - t;
    const x0 = x - X0, y0 = y - Y0, z0 = z - Z0;

    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3;

    const ii = i & 255, jj = j & 255, kk = k & 255;
    const gi0 = perm[ii + perm[jj + perm[kk]]] % 12;
    const gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12;
    const gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12;
    const gi3 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12;

    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot3(grad3[gi0], x0, y0, z0); }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot3(grad3[gi1], x1, y1, z1); }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot3(grad3[gi2], x2, y2, z2); }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) { t3 *= t3; n3 = t3 * t3 * dot3(grad3[gi3], x3, y3, z3); }

    return 32.0 * (n0 + n1 + n2 + n3);
  };
};

// Velocity-to-color LUT (thermal: blue → cyan → white → orange → red)
const generateThermalLUT = (isDark: boolean): { r: number; g: number; b: number }[] => {
  const stops = isDark ? [
    { t: 0.0, r: 30, g: 60, b: 120 },    // Deep blue (slow)
    { t: 0.2, r: 40, g: 120, b: 180 },   // Blue
    { t: 0.4, r: 80, g: 200, b: 220 },   // Cyan
    { t: 0.5, r: 180, g: 220, b: 230 },  // Light cyan/white
    { t: 0.6, r: 255, g: 200, b: 120 },  // Orange-yellow
    { t: 0.8, r: 255, g: 120, b: 60 },   // Orange
    { t: 1.0, r: 220, g: 50, b: 50 },    // Red (fast)
  ] : [
    { t: 0.0, r: 100, g: 140, b: 200 },  // Soft blue
    { t: 0.2, r: 80, g: 170, b: 220 },   // Sky blue
    { t: 0.4, r: 100, g: 200, b: 210 },  // Cyan
    { t: 0.5, r: 150, g: 180, b: 180 },  // Neutral
    { t: 0.6, r: 220, g: 160, b: 100 },  // Tan
    { t: 0.8, r: 230, g: 120, b: 80 },   // Orange
    { t: 1.0, r: 200, g: 80, b: 80 },    // Red
  ];

  const LUT_SIZE = 256;
  const lut: { r: number; g: number; b: number }[] = [];

  for (let i = 0; i <= LUT_SIZE; i++) {
    const t = i / LUT_SIZE;
    let start = stops[0], end = stops[stops.length - 1];
    for (let j = 0; j < stops.length - 1; j++) {
      if (t >= stops[j].t && t <= stops[j + 1].t) {
        start = stops[j];
        end = stops[j + 1];
        break;
      }
    }
    const range = end.t - start.t || 1;
    const localT = (t - start.t) / range;
    // Smooth interpolation
    const smoothT = localT * localT * (3 - 2 * localT);
    lut.push({
      r: Math.floor(start.r + (end.r - start.r) * smoothT),
      g: Math.floor(start.g + (end.g - start.g) * smoothT),
      b: Math.floor(start.b + (end.b - start.b) * smoothT),
    });
  }
  return lut;
};

const CFDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const noise3D = useRef(createNoise3D()).current;

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Memoize the animation setup
  const setupAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return () => {};

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = themeRef.current === 'dark' ? '#050810' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return () => {};
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    let time = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    // Adaptive particle count based on screen size
    const getParticleCount = () => {
      const area = width * height;
      if (area > 2000000) return 500;  // Large desktop
      if (area > 1000000) return 400;  // Desktop
      if (area > 500000) return 300;   // Tablet
      return 200;                       // Mobile
    };

    const TRAIL_LENGTH = 12;
    const TIME_STEP = 0.0018;
    const FREE_STREAM_VX = 1.6;

    let mouseX = -1000;
    let mouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;
    let lastMouseX = -1000;
    let lastMouseY = -1000;

    // Pre-generate LUTs for both themes
    const darkLUT = generateThermalLUT(true);
    const lightLUT = generateThermalLUT(false);

    // Streamline particle class
    class StreamParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      trail: { x: number; y: number }[];
      age: number;
      lifespan: number;
      seed: number;

      constructor(randomStart = true) {
        this.x = randomStart ? Math.random() * width : -Math.random() * 80;
        this.y = Math.random() * height;
        this.vx = FREE_STREAM_VX;
        this.vy = 0;
        this.trail = [];
        this.age = Math.random() * 150;
        this.lifespan = 300 + Math.random() * 300;
        this.seed = Math.random() * 1000;
      }

      // Velocity field: potential flow + noise perturbations
      getVelocity(x: number, y: number, t: number): { vx: number; vy: number } {
        const scale = 0.0018;
        const flowT = t * 0.12;
        
        // Base flow with boundary layer profile
        const normalizedY = y / height;
        const boundaryLayer = Math.sin(Math.pow(normalizedY, 0.7) * Math.PI);
        let vx = FREE_STREAM_VX * (0.4 + 0.8 * boundaryLayer);
        let vy = 0;

        // Large-scale turbulent structures
        const n1 = noise3D(x * scale, y * scale, flowT);
        const n2 = noise3D(x * scale + 100, y * scale + 100, flowT * 0.7);
        vx += n1 * 0.8;
        vy += n2 * 0.6;

        // Fine-scale turbulence
        vx += noise3D(x * scale * 3, y * scale * 3, flowT * 2) * 0.25;
        vy += noise3D(x * scale * 3 + 50, y * scale * 3 + 50, flowT * 2) * 0.2;

        // Mouse influence: vortex shedding simulation
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distSq = dx * dx + dy * dy;
        const INFLUENCE_RADIUS = 180;
        const INFLUENCE_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

        if (distSq < INFLUENCE_SQ && distSq > 100) {
          const dist = Math.sqrt(distSq);
          const influence = Math.pow(1 - dist / INFLUENCE_RADIUS, 2);
          
          // Deflection around mouse (potential flow around cylinder)
          const tangentX = -dy / dist;
          const tangentY = dx / dist;
          
          vx += tangentX * influence * 2.5;
          vy += tangentY * influence * 2.5;
          
          // Push away from mouse center
          vx += (dx / dist) * influence * 1.5;
          vy += (dy / dist) * influence * 1.2;
        }

        // Wake region: von Kármán vortex street behind mouse
        if (dx > 0 && dx < 400 && Math.abs(dy) < 100 + dx * 0.3) {
          const wakeX = dx / 400;
          const wakeIntensity = (1 - wakeX) * 0.8;
          // Alternating vortices
          const shedFreq = 8.0;
          const vortexPhase = Math.sin(x * 0.015 - t * shedFreq) * Math.cos(y * 0.03);
          vy += vortexPhase * wakeIntensity * 3;
          // Velocity deficit in wake
          vx *= 0.7 + 0.3 * wakeX;
        }

        return { vx, vy };
      }

      update(t: number) {
        this.age++;
        
        const vel = this.getVelocity(this.x, this.y, t);
        
        // Smooth velocity update (inertia)
        const LAG = 0.12;
        this.vx += (vel.vx - this.vx) * LAG;
        this.vy += (vel.vy - this.vy) * LAG;

        // Small random perturbation for natural look
        this.vx += (Math.random() - 0.5) * 0.03;
        this.vy += (Math.random() - 0.5) * 0.03;

        this.x += this.vx;
        this.y += this.vy;

        // Trail management
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > TRAIL_LENGTH) this.trail.shift();

        // Respawn conditions
        if (this.x > width + 80 || this.y < -50 || this.y > height + 50 || this.age > this.lifespan) {
          this.reset();
        }
      }

      reset() {
        this.x = -Math.random() * 100;
        this.y = Math.random() * height;
        this.vx = FREE_STREAM_VX;
        this.vy = 0;
        this.trail = [];
        this.age = 0;
        this.lifespan = 300 + Math.random() * 300;
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean, lut: { r: number; g: number; b: number }[]) {
        if (this.trail.length < 2) return;

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        let t = (speed - 0.3) / 3.0;
        t = Math.max(0, Math.min(1, t));

        const colorIdx = Math.floor(t * 255);
        const c = lut[colorIdx] || lut[128];

        // Fade in/out
        const fadeIn = Math.min(this.age / 25, 1);
        const fadeOut = Math.min((this.lifespan - this.age) / 50, 1);
        let alpha = Math.min(fadeIn, fadeOut);
        alpha = isDark ? alpha * 0.35 : alpha * 0.28;

        // Draw smooth curve through trail points
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        
        for (let i = 1; i < this.trail.length - 1; i++) {
          const xc = (this.trail[i].x + this.trail[i + 1].x) / 2;
          const yc = (this.trail[i].y + this.trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.trail[i].x, this.trail[i].y, xc, yc);
        }
        
        const last = this.trail[this.trail.length - 1];
        ctx.lineTo(last.x, last.y);

        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, 2.0 - t * 1.2);
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    let particles: StreamParticle[] = [];
    let particleCount = getParticleCount();

    const init = () => {
      particles = [];
      particleCount = getParticleCount();
      for (let i = 0; i < particleCount; i++) {
        particles.push(new StreamParticle(true));
      }
    };

    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Adjust particle count on resize
        const newCount = getParticleCount();
        if (newCount !== particleCount) {
          particleCount = newCount;
          init();
        }
      }, 150);
    };

    // Track mouse velocity for better wake simulation
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseVx = mouseX - lastMouseX;
      mouseVy = mouseY - lastMouseY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const animate = () => {
      time += TIME_STEP;
      const isDark = themeRef.current === 'dark';
      const lut = isDark ? darkLUT : lightLUT;

      // Clear with subtle trail persistence
      if (isDark) {
        ctx.fillStyle = 'rgba(5, 8, 16, 0.22)';
      } else {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.35)';
      }
      ctx.fillRect(0, 0, width, height);

      // Subtle grid overlay
      ctx.fillStyle = isDark ? 'rgba(100, 120, 140, 0.015)' : 'rgba(100, 120, 140, 0.025)';
      const GRID_X = 100, GRID_Y = 70;
      for (let x = 0; x < width; x += GRID_X) ctx.fillRect(x, 0, 1, height);
      for (let y = 0; y < height; y += GRID_Y) ctx.fillRect(0, y, width, 1);

      // Blending mode for glow effect
      ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';

      // Update and draw particles
      for (const p of particles) {
        p.update(time);
        p.draw(ctx, isDark, lut);
      }

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, [noise3D]);

  useEffect(() => {
    const cleanup = setupAnimation();
    return cleanup;
  }, [setupAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};

export default CFDBackground;
