import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';

/** Photos, renders and screenshots live in src/media/ and get resized and converted at build time. */
const images = import.meta.glob<{ default: ImageMetadata }>('/src/media/**/*.{jpg,jpeg,png,webp,avif}');

export async function findImage(path?: string): Promise<ImageMetadata | null> {
  if (!path) return null;
  const load = images[`/src/media/${path}`];
  return load ? (await load()).default : null;
}

/**
 * Video, frame sequences, splats, GLB and SVG layers live in public/media/ and are served as they are.
 * To move heavy files to a CDN later, set PUBLIC_MEDIA_BASE and nothing else has to change.
 */
export function mediaUrl(path: string): string {
  const base = import.meta.env.PUBLIC_MEDIA_BASE ?? '/media';
  return `${base}/${path}`;
}

export function publicExists(path?: string): boolean {
  return !!path && existsSync(join(process.cwd(), 'public', 'media', path));
}

export const isDev = import.meta.env.DEV;
