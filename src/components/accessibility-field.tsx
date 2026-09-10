"use client";

import { useEffect, useRef } from "react";

import { SQUARE, accessibility } from "@/lib/content";

/**
 * The interface adapts to you.
 *
 * Four translucent panes hang at four depths, one per mode of interacting.
 * What is painted on them is the interface as it arrives with nothing done for
 * anyone: thin, dim, drained of colour, and — on the mobility pane — a path
 * that does not connect. The whole field is rendered twice. The second copy is
 * the same structure with everything accessibility adds to it, and it is shown
 * only through a square window that follows the pointer.
 *
 * So the argument is made by the graphic rather than stated over it: nothing
 * appears that was not already there, it is only presented differently. That is
 * also why the window is square and hairline-framed with the four quadrant
 * colours at its corners — it is a viewport, not a magnifying glass.
 *
 * No GSAP here, deliberately, though it is loaded on this page for the section
 * reveals. The installation animates two CSS custom properties (the window) and
 * two angles (the stack) and they have to stay locked to each other or the
 * object comes apart; one requestAnimationFrame loop with one smoothing
 * constant guarantees that, and tweening custom properties is the one thing
 * GSAP makes harder rather than easier.
 *
 * Parallax is not computed. The panes sit at different `translateZ` inside one
 * perspective, so rotating the stack moves them by different amounts on its
 * own — the depth is real, so the parallax is free.
 */

type Variant = "base" | "lens";

/** Position and depth live in the stylesheet so the arrangement can change at
 *  narrow widths without a matchMedia read that React would have to hydrate. */
const PANES = ["ax-p1", "ax-p2", "ax-p3", "ax-p4"];

/** Where the window rests when nothing is pointing at it — straddling the
 *  vision and mobility panes, so the still frame already shows two readings.
 *  The stylesheet holds the matching `--lx/--ly/--rx/--ry`; if these two move,
 *  those move with them or the first pointer entry snaps instead of picking up. */
const REST_X = 0.5;
const REST_Y = 0.47;

/** How long the travelling window rests on each word before moving to the next.
 *  Long enough to read it, short enough that the tour is not a slideshow. */
const DWELL = 2200;

function Mark({ mode, lens }: { mode: string; lens: boolean }) {
  switch (mode) {
    /* A contrast ramp. Bars narrow and darken upward, the way small dim text
       does, and resolve downward into something you can actually read. */
    case "visao":
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={2}
              y={6 + i * 13}
              width={106 - i * 16}
              height={3 + i * 1.6}
              fill="currentColor"
              opacity={lens ? 0.32 + i * 0.17 : 0.26 + i * 0.08}
            />
          ))}
        </>
      );

    /* Amplitude. Sound is the one mode with nothing to look at, so the pane
       shows the signal itself; the lens names what carries it in text. */
    case "audicao": {
      const amp = [
        0.3, 0.62, 0.95, 0.45, 0.8, 0.35, 0.7, 0.5, 0.9, 0.4, 0.65, 0.28, 0.75,
        0.55, 0.38,
      ];
      return (
        <>
          {amp.map((a, i) => {
            const h = a * 52;
            return (
              <rect
                key={i}
                x={2 + i * 8}
                y={36 - h / 2}
                width={3.4}
                height={h}
                fill="currentColor"
                opacity={lens ? 0.92 : 0.45}
              />
            );
          })}
        </>
      );
    }

    /* Focus order, as a route. Broken and unmarked until the lens passes:
       then the path joins up and every stop gets a ring around it. */
    case "mobilidade": {
      const pts: [number, number][] = [
        [12, 54],
        [36, 26],
        [60, 46],
        [84, 18],
        [108, 42],
      ];
      return (
        <>
          <polyline
            points={pts.map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeDasharray={lens ? undefined : "3 7"}
            opacity={lens ? 0.85 : 0.5}
          />
          {pts.map(([x, y], i) => (
            <g key={i}>
              {lens ? (
                <rect
                  x={x - 9}
                  y={y - 9}
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  opacity={0.55}
                />
              ) : null}
              <rect
                x={x - 4}
                y={y - 4}
                width={8}
                height={8}
                fill="currentColor"
                opacity={lens ? 1 : 0.55}
              />
            </g>
          ))}
        </>
      );
    }

    /* The only pane whose geometry changes rather than its weight: forty
       fragments outside the window, three plain blocks inside it. Same
       information, less to hold in your head at once. */
    case "cognicao":
      return lens ? (
        <>
          <rect x={4} y={8} width={50} height={24} fill="currentColor" opacity={0.85} />
          <rect x={4} y={40} width={50} height={24} fill="currentColor" opacity={0.5} />
          <rect
            x={62}
            y={8}
            width={54}
            height={56}
            fill="none"
            stroke="currentColor"
            opacity={0.6}
          />
        </>
      ) : (
        <>
          {Array.from({ length: 40 }, (_, i) => (
            <rect
              key={i}
              x={4 + (i % 8) * 14.5}
              y={8 + Math.floor(i / 8) * 11.5}
              width={9}
              height={6}
              fill="currentColor"
              opacity={0.22 + ((i * 7) % 5) * 0.06}
            />
          ))}
        </>
      );

    default:
      return null;
  }
}

function Pane({
  mode,
  index,
  variant,
}: {
  mode: (typeof accessibility.modes)[number];
  index: number;
  variant: Variant;
}) {
  const lens = variant === "lens";

  return (
    <li
      className={`ax-pane ${PANES[index]}`}
      style={{ "--c": SQUARE[mode.color] } as React.CSSProperties}
    >
      <span aria-hidden="true" className="ax-glow" />
      <span aria-hidden="true" className="ax-face" />

      <span className="ax-body">
        <span className="ax-head">
          <span className="t-label text-[0.75rem] text-white sm:text-[0.8125rem]">
            {mode.name}
            {/* The window is a pointer affordance, so what it uncovers is said
                here too. Nothing in this section is only available by hovering. */}
            {lens ? null : (
              <span className="sr-only"> — {mode.provision}</span>
            )}
          </span>

          {/* Set as type rather than as a filled chip: the mask fades across
              whatever it meets, and a word fading reads as a reveal where a
              sliced rectangle reads as a crop. Rendered in both copies so the
              two layouts stay in register, and hidden in CSS in the base. */}
          <span aria-hidden="true" className="ax-word t-label">
            {mode.provision}
          </span>
        </span>

        <svg
          className="ax-mark"
          viewBox="0 0 120 72"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <Mark mode={mode.key} lens={lens} />
        </svg>
      </span>
    </li>
  );
}

export function AccessibilityField() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    // Asked for less movement: the stylesheet already holds the stack at its
    // resting tilt with the window parked over the centre pane, which is a
    // composition rather than a frozen animation. Nothing below needs to run.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const coarse = !window.matchMedia("(pointer: fine)").matches;

    let tx = REST_X;
    let ty = REST_Y;
    let cx = REST_X;
    let cy = REST_Y;
    let raf = 0;
    let visible = false;
    // Without a pointer to follow, the window travels on its own.
    let drifting = coarse;
    let origin = 0;

    // Cached: the loop writes custom properties every frame, so reading the
    // box inside the pointer handler would force layout on each move.
    let box = el.getBoundingClientRect();
    const remeasure = () => {
      box = el.getBoundingClientRect();
    };

    /*
     * Where the window goes when it is travelling on its own: over each of the
     * four words in turn, in the order the lead sentence names them. A visitor
     * who cannot hover still has to be shown what the window is for, and an
     * arbitrary path spends most of its time over empty stage.
     *
     * Read back from the render rather than authored here, so the narrow-width
     * arrangement does not need a second copy of the geometry in this file.
     * Only layout changes them, so this is not part of the scroll handler.
     */
    let stops: [number, number][] = [];
    const restops = () => {
      // Half the window's own width. Placing the stop a radius to the right of
      // where the word begins puts the window's leading edge just clear of it,
      // rather than centring on a label box that is full-pane-width and mostly
      // empty — which would leave the word itself out in the cold.
      const win = el.querySelector<HTMLElement>(".ax-window");
      const reach = (win ? win.offsetWidth / 2 : 0) - 10;

      stops = Array.from(
        el.querySelectorAll<HTMLElement>(".ax-lens .ax-word"),
      ).map((word) => {
        const r = word.getBoundingClientRect();
        return [
          (r.left + reach - box.left) / box.width,
          (r.top + r.height / 2 - box.top) / box.height,
        ];
      });
    };

    const write = () => {
      el.style.setProperty("--lx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--ly", `${(cy * 100).toFixed(2)}%`);
      el.style.setProperty("--rx", `${((0.5 - cy) * 13 - 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((cx - 0.5) * 19 - 12).toFixed(2)}deg`);
    };

    const frame = (now: number) => {
      if (drifting && stops.length) {
        // Clamped at zero: the timestamp a frame is given is the moment that
        // frame began, which can predate the `performance.now()` read that set
        // the origin, and a negative index here would land off the array.
        const elapsed = Math.max(0, now - origin);
        // Holding the target still between stops is what produces the pause:
        // the smoothing below eases into each word and then rests on it.
        const [nx, ny] = stops[Math.floor(elapsed / DWELL) % stops.length];
        tx = nx;
        ty = ny;
      }

      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      write();

      if (!drifting && Math.abs(tx - cx) < 4e-4 && Math.abs(ty - cy) < 4e-4) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !visible) return;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      drifting = false;
      // Slightly past the edges, so the window can leave the frame instead of
      // sticking to it when the pointer runs off.
      tx = Math.min(1.06, Math.max(-0.06, (e.clientX - box.left) / box.width));
      ty = Math.min(1.06, Math.max(-0.06, (e.clientY - box.top) / box.height));
      start();
    };

    const release = () => {
      if (coarse) {
        drifting = true;
        origin = performance.now();
      } else {
        tx = REST_X;
        ty = REST_Y;
      }
      start();
    };

    const relayout = () => {
      remeasure();
      restops();
    };

    // Nothing runs while the section is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          remeasure();
          restops();
          origin = performance.now();
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(el);

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", release);
    // `touch-action: pan-y` lets the page keep scrolling vertically; when the
    // browser takes the gesture it cancels ours, and the drift resumes.
    el.addEventListener("pointercancel", release);
    window.addEventListener("pointerup", release);
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", relayout);

    return () => {
      stop();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("pointercancel", release);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", relayout);
    };
  }, []);

  return (
    <div
      ref={stage}
      className="ax relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/3]"
    >
      <div className="ax-layer ax-base">
        {/* The four modes are the section's content, not its decoration, so
            this is the list a screen reader gets — the panes are its items. */}
        <ul className="ax-space" aria-label="Formas de interagir contempladas no design">
          {accessibility.modes.map((mode, i) => (
            <Pane key={mode.key} mode={mode} index={i} variant="base" />
          ))}
        </ul>
      </div>

      <div className="ax-layer ax-lens" aria-hidden="true">
        <ul className="ax-space">
          {accessibility.modes.map((mode, i) => (
            <Pane key={mode.key} mode={mode} index={i} variant="lens" />
          ))}
        </ul>
      </div>

      {/* The frame of the window. Quadrant colours at the corners, in the
          mark's own order, so it reads as belonging to the logo. */}
      <div aria-hidden="true" className="ax-window">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
