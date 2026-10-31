import Lenis from "lenis";

let lenis = null;

// Starts Lenis smooth scrolling (skipped for reduced-motion users) and returns a cleanup function.
export function startSmoothScroll() {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  lenis = new Lenis({ lerp: 0.1, anchors: { offset: 0 } });
  if (import.meta.env.DEV) window.__lenis = lenis; // handy for scripted scrolling while developing
  let frame = requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  });

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };
}

export const getLenis = () => lenis;
