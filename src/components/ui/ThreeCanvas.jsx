import React, { useEffect, useRef } from 'react';

/**
 * ThreeCanvas: High-performance, subtle futuristic 3D particle & grid wave.
 * Uses native Canvas 2D / 3D projection mathematics matching TaskFlow palette:
 * #88BDF2 (Primary bright), #6A89A7 (Primary dark), #BDDDFC (Accent)
 */
export function ThreeCanvas({ className = '', density = 'medium', interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Generate grid points for 3D perspective wave
    const cols = density === 'high' ? 32 : 24;
    const rows = density === 'high' ? 22 : 16;
    let step = 0;

    const render = () => {
      step += 0.018;
      // Soft mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 350;
      const camY = 180;
      const camZ = -220;

      const points = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const x0 = (c - cols / 2) * 58;
          const z0 = r * 55 + 50;

          // Gentle sine wave displacement + mouse repulsion
          const distToMouse = Math.hypot(
            (width / 2 + x0 * 0.8) - mouse.x,
            (height / 2 + (r * 30)) - mouse.y
          );
          const mouseLift = Math.max(0, 45 - distToMouse * 0.12);

          const wave =
            Math.sin(c * 0.35 + step) * 20 +
            Math.cos(r * 0.4 + step * 1.2) * 18 -
            mouseLift;

          const y0 = wave + camY;

          // 3D to 2D projection
          const pz = z0 - camZ;
          if (pz <= 0) continue;

          const scale = fov / pz;
          const px = width / 2 + x0 * scale;
          const py = height / 2 + (y0 - 240) * scale;

          points[r][c] = { px, py, scale, wave };
        }
      }

      // Draw subtle connecting mesh lines
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r]?.[c];
          if (!p) continue;

          // Horizontal wire
          if (c < cols - 1 && points[r]?.[c + 1]) {
            const pNext = points[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pNext.px, pNext.py);
            ctx.strokeStyle = `rgba(136, 189, 242, ${Math.min(0.25, p.scale * 0.28)})`;
            ctx.stroke();
          }

          // Depth wire
          if (r < rows - 1 && points[r + 1]?.[c]) {
            const pDown = points[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pDown.px, pDown.py);
            ctx.strokeStyle = `rgba(106, 137, 167, ${Math.min(0.22, p.scale * 0.25)})`;
            ctx.stroke();
          }

          // Glowing node dots
          const radius = Math.max(1, p.scale * 2.2);
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(189, 221, 252, ${Math.min(0.7, p.scale * 0.65)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-60 dark:opacity-40 ${className}`}
    />
  );
}
