"use client";

import { useEffect, useRef } from "react";

import { Action } from "@/components/ui/action";
import { onceInView, prefersReducedMotion } from "@/lib/in-view";
import { SQUARE, type SquareColor } from "@/lib/content";

/**
 * The page closes by putting the mark back together.
 *
 * The hero took the symbol apart and pushed the four quadrants to different
 * depths; here they come back from the four corners of the section and lock
 * into the logo — the same move, run backwards, at the end of the scroll. It
 * is the only centred composition on the page, which is what makes it read as
 * an ending rather than another band.
 *
 * If GSAP never arrives, or the visitor has asked for less movement, the mark
 * is simply already assembled: the stylesheet leaves it in its final state.
 */
const QUADRANTS: { key: SquareColor; x: -1 | 1; y: -1 | 1 }[] = [
  { key: "red", x: -1, y: -1 },
  { key: "green", x: 1, y: -1 },
  { key: "blue", x: -1, y: 1 },
  { key: "yellow", x: 1, y: 1 },
];

export function Closing() {
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mark.current;
    if (!el || prefersReducedMotion()) return;

    let cancelled = false;
    let stop: (() => void) | undefined;
    let cleanup: (() => void) | undefined;

    import("gsap")
      .then(({ default: gsap }) => {
        if (cancelled) return;
        const tiles = gsap.utils.toArray<HTMLElement>("[data-quad]", el);

        // Hidden first, so nothing is seen sitting assembled and then jumping
        // back out to the corners when the section is reached.
        gsap.set(tiles, { opacity: 0 });

        stop = onceInView(el, () => {
          const reach = Math.max(window.innerWidth, window.innerHeight) * 0.62;
          gsap.to(tiles, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
          });
          gsap.from(tiles, {
            x: (i: number) => QUADRANTS[i].x * reach,
            y: (i: number) => QUADRANTS[i].y * reach * 0.6,
            rotate: (i: number) => QUADRANTS[i].x * -24,
            scale: 0.4,
            duration: 1.5,
            stagger: 0.07,
            ease: "expo.out",
          });
        });

        cleanup = () => gsap.killTweensOf(tiles);
      })
      .catch(() => {
        // No timeline: the mark stays assembled, which is where it ends anyway.
      });

    return () => {
      cancelled = true;
      stop?.();
      cleanup?.();
    };
  }, []);

  return (
    <section
      aria-labelledby="closing-heading"
      className="on-void relative isolate overflow-hidden bg-void text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 50% at 50% 34%, rgb(0 106 189 / 0.26) 0%, transparent 70%)",
          }}
        />
        <div className="stage-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto flex max-w-[100rem] flex-col items-center px-gutter py-28 text-center md:px-8 lg:py-40">
        <div
          ref={mark}
          aria-hidden="true"
          className="grid grid-cols-2"
          style={
            {
              "--s": "clamp(2.25rem, 5.2vw, 3.75rem)",
              gap: "calc(var(--s) * 0.1)",
            } as React.CSSProperties
          }
        >
          {QUADRANTS.map((q) => (
            <span
              key={q.key}
              data-quad
              className="assemble block size-[var(--s)]"
              style={{
                backgroundColor: SQUARE[q.key],
                boxShadow: `0 0 3.5rem -0.5rem ${SQUARE[q.key]}`,
              }}
            />
          ))}
        </div>

        <h2
          id="closing-heading"
          className="t-display mt-14 max-w-[16ch] text-[clamp(2.25rem,6.4vw,4.75rem)] text-white lg:mt-20"
        >
          Comece pelo que sua organização precisa resolver.
        </h2>

        <div
          data-reveal
          className="mt-12 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:mt-14"
        >
          <Action
            href="https://www.microsoft.com/pt-br/microsoft-cloud"
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorar soluções
          </Action>
          <Action
            href="https://support.microsoft.com/pt-br/contactus"
            variant="ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com a Microsoft
          </Action>
        </div>
      </div>
    </section>
  );
}
