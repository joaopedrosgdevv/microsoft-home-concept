"use client";

import { useEffect, useRef } from "react";

import { SQUARE, type SquareColor } from "@/lib/content";

/**
 * The mark, taken apart.
 *
 * Microsoft's symbol is four squares on one plane. Here they are given depth
 * instead: the same four quadrants, the same colours, pushed to four different
 * distances so the logo only resolves from one angle. The opening sequence
 * flies them in from far behind the screen, lets them lock into the mark for a
 * beat, then relaxes them apart — the brand arriving, then becoming a system.
 *
 * Everything here is transform and gradient. No canvas, no images, no blur
 * filters over large areas: the colour each tile throws is a radial gradient
 * sized to the tile, which composites for free and does not band.
 *
 * The graphic is decorative — the four pillars it stands for are named in the
 * rail below it, which is the part that carries text and takes focus. So this
 * whole subtree is hidden from assistive technology, and nothing inside it is
 * reachable by keyboard.
 */

/** Quadrant order is the mark's own: red, green above; blue, yellow below. */
const TILES: { key: SquareColor; x: 0 | 1; y: 0 | 1; z: number }[] = [
  { key: "red", x: 0, y: 0, z: 42 },
  { key: "green", x: 1, y: 0, z: -38 },
  { key: "blue", x: 0, y: 1, z: -12 },
  { key: "yellow", x: 1, y: 1, z: 76 },
];

/** Squares sit on a 23-unit grid with a 1-unit gutter: a tenth of a square. */
const STEP = "calc(var(--t) * 1.1)";
const offset = (n: 0 | 1) => (n === 0 ? "0px" : STEP);
const castOffset = (n: 0 | 1) =>
  n === 0 ? "calc(var(--t) * -0.8)" : "calc(var(--t) * 0.3)";

export function HeroSystem({ active }: { active: SquareColor | null }) {
  const root = useRef<HTMLDivElement>(null);
  const space = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spaceEl = space.current;
    const rootEl = root.current;
    if (!spaceEl || !rootEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("gsap")
      .then(({ default: gsap }) => {
        if (cancelled) return;

        const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", spaceEl);
        const depth = TILES.map((t) => t.z);

        // Arrive on one plane — the logo — then come apart.
        const intro = gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .set(tiles, { z: 0 })
          .from(tiles, { z: -900, duration: 1, stagger: 0.075 }, 0)
          .from(tiles, { opacity: 0, duration: 0.45, stagger: 0.075 }, 0)
          .from(spaceEl, { rotationY: -34, duration: 1.6 }, 0)
          .from(
            "[data-rings]",
            { opacity: 0, scale: 0.86, duration: 1.4 },
            0.35,
          )
          .to(
            tiles,
            {
              z: (i: number) => depth[i],
              duration: 1,
              ease: "power2.inOut",
              stagger: 0.05,
            },
            1.05,
          );

        // Pointer parallax. Fine pointers only: on touch there is no hover
        // state to answer, and the listener would only cost battery.
        const fine = window.matchMedia("(pointer: fine)");
        let detachPointer: (() => void) | undefined;

        const attachPointer = () => {
          if (!fine.matches || detachPointer) return;
          const rx = gsap.quickTo(spaceEl, "rotationX", {
            duration: 0.9,
            ease: "power3",
          });
          const ry = gsap.quickTo(spaceEl, "rotationY", {
            duration: 0.9,
            ease: "power3",
          });
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            // Rest is -16deg on Y; the range reaches 0, so drifting right
            // squares the mark up and the four quadrants briefly line up.
            ry(-16 + nx * 24);
            rx(-11 - ny * 11);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          detachPointer = () =>
            window.removeEventListener("pointermove", onMove);
        };

        // Nothing runs while the stage is scrolled away.
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              attachPointer();
            } else {
              detachPointer?.();
              detachPointer = undefined;
            }
          },
          { threshold: 0 },
        );
        io.observe(rootEl);

        cleanup = () => {
          intro.kill();
          io.disconnect();
          detachPointer?.();
        };
      })
      .catch(() => {
        // GSAP never arrived. The stylesheet already has the tiles at their
        // resting depths, so the composition stands; it just does not open.
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-active={active ?? undefined}
      className="sys pointer-events-none relative flex h-[calc(var(--t)*2.6)] w-full max-w-[24rem] items-center justify-center lg:max-w-[30rem]"
      style={{ "--t": "clamp(5rem, 27vw, 9.25rem)" } as React.CSSProperties}
    >
      {/* One box the size of the assembled mark. Every layer below is pinned
          to it, so the cluster stays centred whatever the column does. */}
      <div className="relative size-[calc(var(--t)*2.1)]">
        {/* The light the tiles throw. Flat layer: ambient light does not need
            to be rotated with the objects casting it. */}
        <div className="absolute inset-0">
          {TILES.map((t) => (
            <span
              key={t.key}
              data-live={active === t.key || undefined}
              className="sys-cast size-[calc(var(--t)*2.6)]"
              style={
                {
                  "--c": SQUARE[t.key],
                  left: castOffset(t.x),
                  top: castOffset(t.y),
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div ref={space} className="sys-space absolute inset-0">
          {/* Reach. Three rings laid flat under the mark, so the object reads
              as standing on something that extends past the frame. */}
          <svg
            data-rings
            viewBox="0 0 400 400"
            className="absolute top-1/2 left-1/2 size-[calc(var(--t)*3.6)] [transform:translate(-50%,-50%)_rotateX(76deg)_translateZ(-130px)]"
          >
            <defs>
              <linearGradient id="ring-fade" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00a4ef" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#7fba00" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {[196, 148, 100].map((r) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="url(#ring-fade)"
                strokeWidth="1.25"
              />
            ))}
          </svg>

          {TILES.map((t) => (
            <span
              key={t.key}
              data-tile
              className="sys-node size-[var(--t)]"
              style={
                {
                  "--z": `${t.z}px`,
                  left: offset(t.x),
                  top: offset(t.y),
                } as React.CSSProperties
              }
            >
              <span
                data-live={active === t.key || undefined}
                className="sys-tile"
                style={{ "--c": SQUARE[t.key] } as React.CSSProperties}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
