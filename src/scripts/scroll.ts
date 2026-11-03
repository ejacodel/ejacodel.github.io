/** One shared scroll loop for every scroll-driven component. */
type Listener = () => void;
const listeners = new Set<Listener>();
let queued = false;

const run = () => {
  queued = false;
  listeners.forEach((fn) => fn());
};
const queue = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(run);
  }
};

export function onScroll(fn: Listener): () => void {
  if (listeners.size === 0) {
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue, { passive: true });
  }
  listeners.add(fn);
  queue();
  return () => listeners.delete(fn);
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Progress (0 to 1) through a tall element whose child is position: sticky. */
export function pinProgress(el: Element): number {
  const r = el.getBoundingClientRect();
  const stage = el.firstElementChild?.getBoundingClientRect().height ?? innerHeight;
  const range = r.height - stage;
  const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 0;
  return range > 0 ? clamp((top - r.top) / range) : 0;
}

/** Maps progress in the range [a, b] onto 0 to 1. */
export const segment = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const ease = (t: number) => t * t * (3 - 2 * t);
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
