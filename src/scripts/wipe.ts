import { clamp, onScroll, pinProgress, reducedMotion } from './scroll';

/**
 * Two stacked layers split by a divider. Used for slice vs stack, CAD vs reality, and so on.
 *   mode="follow"  the divider follows the pointer (hero)
 *   mode="drag"    drag or use the arrow keys
 *   mode="scroll"  the page scroll drives it until the visitor takes over by dragging
 * If both layers contain a <video>, the second is kept in sync with the first.
 */
class XWipe extends HTMLElement {
  private taken = false;
  private stop?: () => void;

  set(p: number) {
    const v = clamp(p);
    this.style.setProperty('--p', `${v * 100}%`);
    const bar = this.querySelector<HTMLElement>('[role="slider"]');
    bar?.setAttribute('aria-valuenow', String(Math.round(v * 100)));
  }

  connectedCallback() {
    const mode = this.getAttribute('mode') ?? 'drag';
    this.set(parseFloat(this.getAttribute('start') ?? '.5'));
    const fromEvent = (e: PointerEvent) => {
      const r = this.getBoundingClientRect();
      return (e.clientX - r.left) / r.width;
    };
    let dragging = false;

    this.addEventListener('pointerdown', (e) => {
      if (mode === 'follow' && e.pointerType === 'mouse') return;
      if (e.pointerType !== 'mouse') {
        const now = parseFloat(this.style.getPropertyValue('--p')) / 100;
        const width = this.getBoundingClientRect().width;
        if (Math.abs(fromEvent(e) - now) * width > 44) return;
      }
      dragging = true;
      this.taken = true;
      this.setPointerCapture(e.pointerId);
      this.set(fromEvent(e));
    });
    this.addEventListener('pointermove', (e) => {
      if (dragging || (mode === 'follow' && e.pointerType === 'mouse')) this.set(fromEvent(e));
    });
    const release = () => (dragging = false);
    this.addEventListener('pointerup', release);
    this.addEventListener('pointercancel', release);

    this.querySelector('[role="slider"]')?.addEventListener('keydown', (e) => {
      const key = (e as KeyboardEvent).key;
      if (key !== 'ArrowLeft' && key !== 'ArrowRight') return;
      e.preventDefault();
      this.taken = true;
      const now = parseFloat(this.style.getPropertyValue('--p')) / 100;
      this.set(now + (key === 'ArrowRight' ? 0.04 : -0.04));
    });

    if (mode === 'scroll' && reducedMotion()) this.set(0.5);
    if (mode === 'scroll' && !reducedMotion()) {
      const host = this.closest('[data-pin]');
      if (host) this.stop = onScroll(() => {
        if (!this.taken) this.set(1.05 - pinProgress(host) * 1.1);
      });
    }

    const videos = this.querySelectorAll('video');
    if (videos.length === 2) {
      const [a, b] = videos;
      a.addEventListener('timeupdate', () => {
        if (Math.abs(a.currentTime - b.currentTime) > 0.04) b.currentTime = a.currentTime;
      });
    }
  }

  disconnectedCallback() {
    this.stop?.();
  }
}
customElements.define('x-wipe', XWipe);
