// Generates the STAND-IN PCB layers used until the real KiCad exports exist.
// This is fake artwork, made only so the exploded-view mechanism can be seen working.
// Replace it with `kicad-cli pcb export svg` output (see docs/MEDIA.md).
//   node tools/make-standins.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const out = 'public/media/flash/standin';
mkdirSync(out, { recursive: true });

const W = 800, H = 500, GRID = 20;
let seed = 42;
const rand = (a = 1, b) => {
  seed = (seed * 16807) % 2147483647;
  const u = seed / 2147483647;
  return b === undefined ? u * a : a + u * (b - a);
};
const snap = (v) => Math.round(v / GRID) * GRID;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${body}</svg>`;
const outline = `M14 14H${W - 14}V${H - 14}H14Z`;

// Same via positions on every layer, so they line up when the stack closes.
const vias = Array.from({ length: 46 }, () => [snap(rand(50, W - 50)), snap(rand(40, H - 40))]);
const viaDots = (radius, fill) => vias.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}"/>`).join('');

function tracePath(x, y, segments) {
  let d = `M${x} ${y}`;
  for (let i = 0; i < segments; i++) {
    const angle = (Math.floor(rand(8)) * 45 * Math.PI) / 180;
    const length = GRID * Math.ceil(rand(1, 6));
    x = Math.min(W - 24, Math.max(24, x + Math.round(Math.cos(angle)) * length));
    y = Math.min(H - 24, Math.max(24, y + Math.round(Math.sin(angle)) * length));
    d += `L${x} ${y}`;
  }
  return d;
}
const traces = (count, width, color = '#fff') =>
  `<g fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round">` +
  Array.from({ length: count }, (_, i) => {
    const [x, y] = vias[i % vias.length];
    return `<path d="${tracePath(x, y, 3 + Math.floor(rand(4)))}"/>`;
  }).join('') + '</g>';

const pads = () => Array.from({ length: 90 }, () => {
  const x = snap(rand(40, W - 40)), y = snap(rand(40, H - 40));
  return `<rect x="${x - 7}" y="${y - 4}" width="14" height="8" fill="#fff"/>`;
}).join('');

function qfn(x, y, size) {
  let o = `<rect x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" fill="#fff"/>`;
  for (let i = 0; i < 10; i++) {
    const t = -size / 2 + ((i + 0.5) * size) / 10;
    o += `<rect x="${x + t - 2}" y="${y - size / 2 - 18}" width="4" height="12" fill="#fff"/>`;
    o += `<rect x="${x + t - 2}" y="${y + size / 2 + 6}" width="4" height="12" fill="#fff"/>`;
    o += `<rect x="${x - size / 2 - 18}" y="${y + t - 2}" width="12" height="4" fill="#fff"/>`;
    o += `<rect x="${x + size / 2 + 6}" y="${y + t - 2}" width="12" height="4" fill="#fff"/>`;
  }
  return o;
}

writeFileSync(`${out}/l1.svg`, svg(traces(34, 4) + pads() + qfn(400, 240, 80) + viaDots(6, '#fff')));
writeFileSync(`${out}/l2.svg`, svg(`<path d="${outline}" fill="#fff"/>` + viaDots(9, '#000') + `<rect x="120" y="360" width="340" height="5" fill="#000"/>`));
writeFileSync(`${out}/l3.svg`, svg(`<path d="M14 14H420V240H300V486H14Z" fill="#fff"/><path d="M440 14H786V300H440Z" fill="#fff"/><path d="M320 320H786V486H320Z" fill="#fff"/>` + viaDots(9, '#000')));
writeFileSync(`${out}/l4.svg`, svg(traces(26, 5) + pads() + viaDots(6, '#fff')));

const parts = Array.from({ length: 70 }, () => {
  const x = snap(rand(40, W - 40)), y = snap(rand(40, H - 40)), wide = rand() > 0.5;
  return `<rect x="${x - (wide ? 9 : 5)}" y="${y - (wide ? 5 : 9)}" width="${wide ? 18 : 10}" height="${wide ? 10 : 18}" fill="#c9c9c9" stroke="#000"/>`;
}).join('');
writeFileSync(`${out}/board.svg`, svg(
  `<path d="${outline}" fill="#181818" stroke="#fff" stroke-width="2"/>` +
  `<g opacity=".28">${traces(30, 4, '#8a8a8a')}</g>` + viaDots(5, '#9a9a9a') + parts +
  `<rect x="350" y="190" width="100" height="100" fill="#0a0a0a" stroke="#fff"/><circle cx="364" cy="204" r="4" fill="#fff"/>` +
  `<rect x="620" y="50" width="140" height="90" fill="#333" stroke="#fff"/>` +
  `<text x="40" y="470" fill="#fff" font-family="monospace" font-size="16">STAND-IN ARTWORK / NOT THE REAL BOARD</text>`,
));
console.log('stand-in PCB layers written to', out);
