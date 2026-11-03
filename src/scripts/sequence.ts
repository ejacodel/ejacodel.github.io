import { onScroll, pinProgress, reducedMotion } from './scroll';

/**
 * Scrubs a numbered image sequence on a canvas as the page scrolls.
 * Use this for rendered animations (exploded assemblies, axis motion). Frames are exact and,
 * unlike video seeking, do not stutter on any browser.
 */
class XSequence extends HTMLElement {
  private stop?: () => void;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    const ctx = canvas?.getContext('2d');
    const pattern = this.getAttribute('pattern');
    const count = Number(this.getAttribute('count') ?? 0);
    if (!canvas || !ctx || !pattern || !count) return;
    const frames: HTMLImageElement[] = [];
    const urlFor = (i: number) => pattern.replace(/#+/, (m) => String(i + 1).padStart(m.length, '0'));
    let current = -1;

    const draw = (i: number) => {
      const img = frames[i];
      if (!img?.complete || !img.naturalWidth) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      current = i;
    };
    const load = (i: number) => {
      if (frames[i]) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = urlFor(i);
      img.onload = () => { if (i === want) draw(i); };
      frames[i] = img;
    };
    let want = 0;
    load(0);

    if (reducedMotion()) {
      want = count - 1;
      load(want);
      return;
    }
    // Start loading the rest only when the section comes near.
    new IntersectionObserver((entries, io) => {
      if (entries[0].isIntersecting) {
        for (let i = 0; i < count; i++) load(i);
        io.disconnect();
      }
    }, { rootMargin: '100% 0px' }).observe(this);

    this.stop = onScroll(() => {
      want = Math.round(pinProgress(this) * (count - 1));
      if (want !== current) draw(want);
    });
  }

  disconnectedCallback() {
    this.stop?.();
  }
}
customElements.define('x-sequence', XSequence);
