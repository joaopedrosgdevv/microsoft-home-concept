"use client";

import { useEffect, useRef } from "react";

const CELL = 16;
const DOT = 3;
const RADIUS = 165;
const BASE = "#d9d9d3";
/** The mark's four colours, tiled 2x2 across the field. */
const BRAND = ["#f25022", "#7fba00", "#00a4ef", "#ffb900"];

/**
 * A field of equal squares — "every person and every organization" as a
 * multitude of identical units. At rest it is a neutral texture. Where the
 * pointer passes, the units take on the four brand colours in their 2x2 order,
 * so the mark emerges from the crowd instead of being stamped on top of it.
 *
 * Idle cost is zero: nothing animates on its own, and the canvas only redraws
 * while the pointer is moving. Skipped for coarse pointers and reduced motion,
 * where it stays a flat static field.
 */
export function HeroLattice() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      const interactive = fine.matches && !reduced.matches;

      for (let c = 0; c < cols; c++) {
        const x = c * CELL;
        for (let r = 0; r < rows; r++) {
          const y = r * CELL;

          if (!interactive) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = BASE;
            ctx.fillRect(x, y, DOT, DOT);
            continue;
          }

          const dist = Math.hypot(x - px, y - py);
          if (dist >= RADIUS) {
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = BASE;
            ctx.fillRect(x, y, DOT, DOT);
            continue;
          }

          // Quadratic falloff gives the highlight a soft edge.
          const t = 1 - dist / RADIUS;
          const eased = t * t;
          ctx.globalAlpha = 0.55 + eased * 0.45;
          ctx.fillStyle = BRAND[(r % 2) * 2 + (c % 2)];
          ctx.fillRect(x, y, DOT + eased * 5, DOT + eased * 5);
        }
      }
      ctx.globalAlpha = 1;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      schedule();
    };

    const onPointerLeave = () => {
      px = -9999;
      py = -9999;
      schedule();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (fine.matches && !reduced.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="size-full"
      style={{
        // Keep the field clear of the headline so text contrast is never at risk.
        maskImage:
          "linear-gradient(105deg, transparent 0%, transparent 34%, black 78%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(105deg, transparent 0%, transparent 34%, black 78%, black 100%)",
      }}
    />
  );
}
