// Writes a small SYNTHETIC .splat file so the viewer can be tried before real scans are exported.
// It is noise on a sphere, not a scan.   node tools/make-test-splat.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const COUNT = 60000;
const buffer = Buffer.alloc(COUNT * 32); // antimatter15 .splat layout: 32 bytes per splat
let seed = 9;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
const noise = (x, y, z) =>
  Math.sin(x * 9 + 1) * Math.sin(y * 11 + 2) * Math.sin(z * 10) * 0.05 +
  Math.sin(x * 23) * Math.sin(y * 27) * Math.sin(z * 25) * 0.018;

for (let i = 0; i < COUNT; i++) {
  const u = rand() * 2 - 1, theta = rand() * Math.PI * 2, q = Math.sqrt(1 - u * u);
  const x = q * Math.cos(theta), y = u, z = q * Math.sin(theta);
  const k = 1 + noise(x, y, z);
  const o = i * 32;
  buffer.writeFloatLE(x * k, o);
  buffer.writeFloatLE(y * k, o + 4);
  buffer.writeFloatLE(z * k, o + 8);
  buffer.writeFloatLE(0.012, o + 12);
  buffer.writeFloatLE(0.012, o + 16);
  buffer.writeFloatLE(0.012, o + 20);
  const v = Math.round(255 * Math.max(0, Math.min(1, 0.42 + noise(x, y, z) * 7)));
  buffer[o + 24] = v; buffer[o + 25] = v; buffer[o + 26] = v; buffer[o + 27] = 255;
  buffer[o + 28] = 255; buffer[o + 29] = 128; buffer[o + 30] = 128; buffer[o + 31] = 128;
}
mkdirSync('public/media/robot', { recursive: true });
writeFileSync('public/media/robot/standin-test.splat', buffer);
console.log('wrote', Math.round(buffer.length / 1024), 'KB');
