"use client";

import { useEffect } from "react";

/**
 * Scroll motion only. The hero opening is CSS (see globals.css) so it can run
 * at first paint; GSAP is here for the one thing CSS cannot do well — reveal
 * a section the first time it comes into view, once, and then stop.
 *
 * GSAP animates; IntersectionObserver decides when. ScrollTrigger was the
 * obvious choice and was tried first, but with `once: true` it drops reveals
 * whenever the scroll position jumps further than one tick can resolve — which
 * is precisely what the header's anchor links do, leaving the skipped sections
 * permanently at opacity 0. IntersectionObserver reports intersection state
 * however the viewport got there, so a section always reveals when it is
 * actually seen.
 *
 * GSAP is imported dynamically because nothing it does is needed above the
 * fold: loaded statically it put ~72 KB and ~0.6 s of scripting into the
 * hydration path, which cost Total Blocking Time and pushed out Largest
 * Contentful Paint for a movement the visitor cannot see yet.
 *
 * Under `prefers-reduced-motion: reduce` nothing runs: the stylesheet already
 * leaves every element in its final state, so the page is static rather than
 * animated-then-snapped. The same is true with JavaScript off — the hidden
 * state is behind `@media (scripting: enabled)`.
 */
export function MotionProvider() {
  useEffect(() => {
    // The stylesheet hides these because a script is running to bring them
    // back. If this layer cannot start, put them back by hand rather than
    // leave the copy invisible.
    const failOpen = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("gsap")
      .then(({ default: gsap }) => {
        if (cancelled) return;

        const tweens: gsap.core.Tween[] = [];

        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              io.unobserve(entry.target);
              tweens.push(
                gsap.to(entry.target, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power3.out",
                }),
              );
            }
          },
          // Hold the reveal until the element is clear of the bottom edge.
          { rootMargin: "0px 0px -10% 0px" },
        );

        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => io.observe(el));

        cleanup = () => {
          io.disconnect();
          tweens.forEach((t) => t.kill());
        };
      })
      .catch(failOpen);

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
