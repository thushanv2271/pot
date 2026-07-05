"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed full-viewport backdrop: blueprint grid + drifting aurora blobs +
 * a lightweight canvas starfield. Sits behind everything (z-0).
 *
 * Perf notes: the aurora blobs are pre-faded radial gradients moved with
 * transform-only keyframes (no `filter: blur()` repaints), and the canvas
 * caps its particle count and device-pixel ratio. Honours reduced motion.
 */

const DARK_TINTS = ["59,130,246", "34,211,238", "167,139,250"];
const LIGHT_TINTS = ["37,99,235", "8,145,178", "124,58,237"];

function blob(color: string, strength: number) {
  return {
    background: `radial-gradient(circle, rgba(${color},${strength}) 0%, rgba(${color},${(
      strength * 0.4
    ).toFixed(3)}) 38%, transparent 70%)`,
  };
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    // Track theme so particle tints stay visible on both canvases.
    let light = document.documentElement.classList.contains("light");
    const themeWatcher = new MutationObserver(() => {
      light = document.documentElement.classList.contains("light");
    });
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number };
    let particles: P[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.min(70, Math.floor((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const tints = light ? LIGHT_TINTS : DARK_TINTS;
      const alphaScale = light ? 0.75 : 1;
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;
        const twinkle = 0.6 + 0.4 * Math.sin(t / 1400 + p.tw);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tints[i % 3]},${(p.a * twinkle * alphaScale).toFixed(3)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) raf = requestAnimationFrame(draw);
    else draw(0); // single static frame

    return () => {
      cancelAnimationFrame(raf);
      themeWatcher.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* blueprint grid, faded at the edges */}
      <div
        className="bg-grid absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 35%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, black 40%, transparent 100%)",
        }}
      />
      {/* aurora blobs — gradient-faded, transform-only drift */}
      <div
        className="aurora absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full"
        style={blob("59,130,246", 0.14)}
      />
      <div
        className="aurora absolute top-1/3 -right-52 h-[32rem] w-[32rem] rounded-full"
        style={{ ...blob("167,139,250", 0.12), animationDelay: "-8s" }}
      />
      <div
        className="aurora absolute -bottom-56 left-1/4 h-[34rem] w-[34rem] rounded-full"
        style={{ ...blob("34,211,238", 0.09), animationDelay: "-15s" }}
      />
      {/* particle field */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* bottom fade so content sections ground into the canvas */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
