import { reducedMotion } from './scroll';

/** Plays muted loops only while they are on screen, and leaves them paused for reduced-motion visitors. */
class XVideo extends HTMLElement {
  private io?: IntersectionObserver;

  connectedCallback() {
    const video = this.querySelector('video');
    if (!video) return;
    if (reducedMotion()) {
      video.controls = true;
      return;
    }
    this.io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { rootMargin: '10% 0px' });
    this.io.observe(this);
  }

  disconnectedCallback() {
    this.io?.disconnect();
  }
}
customElements.define('x-video', XVideo);
