import { clamp, ease, onScroll, pinProgress, reducedMotion, segment } from './scroll';

/**
 * Scroll-driven exploded view of flat layers.
 * Timeline: flat finished part, then tilt into isometric, then separate the layers, then hold.
 * Each layer is plain HTML, so SVG exports from KiCad stay perfectly sharp.
 */
class XExplode extends HTMLElement {
  private stop?: () => void;

  connectedCallback() {
    const stack = this.querySelector<HTMLElement>('[data-stack]');
    const stage = this.querySelector<HTMLElement>('[data-stage]');
    const layers = [...this.querySelectorAll<HTMLElement>('[data-layer]')];
    const labels = [...this.querySelectorAll<HTMLElement>('[data-label]')];
    const finished = this.querySelector<HTMLElement>('[data-finished]');
    const readout = this.querySelector<HTMLElement>('[data-readout]');
    if (!stack || !stage) return;

    const render = (p: number) => {
      const narrow = stage.clientWidth < 760;
      const tilt = ease(segment(p, 0.04, 0.26));
      const open = ease(segment(p, 0.2, 0.78));
      const spacing = stack.clientWidth * (narrow ? 0.27 : 0.17) * open;
      const mid = (layers.length - 1) / 2;
      stack.style.transform = `rotateX(${tilt * 58}deg) rotateZ(${tilt * -36}deg)`;
      layers.forEach((layer, i) => {
        layer.style.transform = `translateZ(${(mid - i) * spacing}px)`;
      });
      if (finished) {
        // The finished board lifts away first, then fades to reveal the stack below.
        finished.style.transform = `translateZ(${(mid + 1) * spacing + 1}px)`;
        finished.style.opacity = String(1 - segment(p, 0.3, 0.46));
      }
      const stageBox = stage.getBoundingClientRect();
      labels.forEach((label, i) => {
        const box = layers[i]?.getBoundingClientRect();
        if (!box) return;
        const reveal = segment(p, 0.44 + i * 0.05, 0.54 + i * 0.05);
        label.style.opacity = String(reveal);
        label.style.top = `${box.top + box.height / 2 - stageBox.top}px`;
        const line = label.querySelector<HTMLElement>('[data-leader]');
        if (line) line.style.width = `${Math.max(0, label.getBoundingClientRect().left - (box.left + box.width * 0.72))}px`;
      });
      if (readout) readout.textContent = `Z ${(open * 100).toFixed(1).padStart(5, '0')} %`;
    };

    if (reducedMotion()) {
      render(1);
      this.toggleAttribute('data-static', true);
      return;
    }
    this.stop = onScroll(() => render(clamp(pinProgress(this))));
  }

  disconnectedCallback() {
    this.stop?.();
  }
}
customElements.define('x-explode', XExplode);
