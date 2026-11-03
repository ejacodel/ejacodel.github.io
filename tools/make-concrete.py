"""Generates the tileable board-formed concrete textures used by the site.
Run once:  python tools/make-concrete.py   (needs numpy, scipy, Pillow)
"""
import os

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

N = 1024
OUT = "public/textures"


def fractal(rng, beta=1.9, aniso=(1.0, 1.0)):
    """Periodic 1/f^beta noise, so the texture tiles with no seams."""
    fx = np.fft.fftfreq(N)[:, None] * aniso[0]
    fy = np.fft.fftfreq(N)[None, :] * aniso[1]
    f = np.sqrt(fx**2 + fy**2)
    f[0, 0] = 1
    spec = (rng.normal(size=(N, N)) + 1j * rng.normal(size=(N, N))) / f**beta
    spec[0, 0] = 0
    x = np.fft.ifft2(spec).real
    return (x - x.mean()) / x.std()


def pits(rng, count, rmin, rmax):
    """Bug holes: small air voids in the surface."""
    h = np.zeros((N, N))
    for _ in range(count):
        cx, cy, r = rng.integers(N), rng.integers(N), rng.uniform(rmin, rmax)
        d = int(r * 3)
        ix = np.arange(cx - d, cx + d) % N
        iy = np.arange(cy - d, cy + d) % N
        gx, gy = np.meshgrid(np.arange(-d, d), np.arange(-d, d), indexing="ij")
        rr = np.sqrt(gx**2 + (gy * rng.uniform(0.8, 1.2)) ** 2)
        h[np.ix_(ix, iy)] -= np.clip(1.15 - rr / r, 0, 1)
    return gaussian_filter(h, 0.6, mode="wrap")


def concrete(seed, base, contrast, pit_strength):
    rng = np.random.default_rng(seed)
    broad = fractal(rng, 1.75)  # cloudy hydration staining
    fine = fractal(rng, 0.75)  # cement grain
    drag = fractal(rng, 1.35, aniso=(1.0, 7.0))  # horizontal formwork drag marks
    h = pits(rng, 300, 0.9, 2.4) + pits(rng, 8, 2.6, 4.5)
    # raking light: derivative of the height field
    relief = np.roll(h, 1, 1) - np.roll(h, -1, 1) + np.roll(h, 1, 0) - np.roll(h, -1, 0)
    img = (
        base
        + contrast * (0.55 * broad + 0.20 * drag + 0.24 * fine)
        + pit_strength * h
        + pit_strength * 0.55 * relief
    )
    return np.clip(img, 0, 255).astype(np.uint8)


os.makedirs(OUT, exist_ok=True)
for name, seed, base, contrast, pit in [
    ("concrete-light", 7, 176, 10, 26),
    ("concrete-dark", 11, 34, 5, 12),
]:
    Image.fromarray(concrete(seed, base, contrast, pit)).save(f"{OUT}/{name}.webp", quality=74, method=6)
    print(name, os.path.getsize(f"{OUT}/{name}.webp") // 1024, "KB")
