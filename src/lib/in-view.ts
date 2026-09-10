/**
 * Run something the first time an element is seen, then stop watching it.
 *
 * The same reasoning as `MotionProvider`: ScrollTrigger would be the obvious
 * tool, but it resolves position on tick, and the header's anchor links jump
 * further than one tick can cover — which silently skips whatever was passed
 * over. IntersectionObserver reports the state however the viewport got there.
 */
export function onceInView(
  el: Element,
  run: () => void,
  rootMargin = "0px 0px -12% 0px",
): () => void {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      run();
    },
    { rootMargin },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** True when the visitor has asked for less movement. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
