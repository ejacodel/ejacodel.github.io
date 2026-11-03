/**
 * The scanned samples shown in the Results chapter. Values come from thesis table 8.3.
 * To unlock the splat view of a sample: export the splat, then put it at the `splat` path.
 */
export interface Scan {
  id: string; name: string; desc: string;
  stack?: string; mesh?: string; texture?: string; splat?: string;
  data: [string, string][];
}

export const scans: Scan[] = [
  {
    id: 'peppercorn', name: 'Peppercorn',
    desc: 'A single peppercorn. 36 views, 28 minutes of acquisition, about 21 minutes of processing.',
    stack: 'robot/peppercorn-stack.jpg', mesh: 'robot/peppercorn-mesh.png', texture: 'robot/peppercorn-texture.jpg',
    splat: 'robot/splats/peppercorn.sog',
    data: [['Photos', '806 (641 useful)'], ['Views', '36 / 36 registered'], ['X step', '0.195 mm'], ['SfM points', '294,173'], ['Reproj.', '0.58 px'], ['Mesh', '2.00 M triangles']],
  },
  {
    id: 'coin', name: '10-cent coin',
    desc: 'The relief lettering is visible in the reconstruction.',
    stack: 'robot/coin-stack.jpg', mesh: 'robot/coin-mesh.png', texture: 'robot/coin-texture.jpg',
    splat: 'robot/splats/coin.sog',
    data: [['Photos', '945 (704 useful)'], ['Views', '36 / 36 registered'], ['X step', '0.986 mm'], ['SfM points', '291,799'], ['Reproj.', '0.39 px'], ['Mesh', '2.26 M triangles']],
  },
  {
    id: 'pcb', name: 'PCB module',
    desc: 'A buck-boost converter module, the largest capture of the set.',
    stack: 'robot/pcb-stack.jpg', mesh: 'robot/pcb-mesh.png',
    splat: 'robot/splats/pcb.sog',
    data: [['Photos', '2,212 (1,349 useful)'], ['Views', '36 / 36 registered'], ['X step', '0.497 mm'], ['SfM points', '246,584'], ['Reproj.', '0.44 px'], ['Mesh', '1.15 M triangles']],
  },
  {
    id: 'seed', name: 'Seed',
    desc: 'The lowest reprojection error of the set.',
    stack: 'robot/seed-stack.jpg', mesh: 'robot/seed-mesh.png',
    splat: 'robot/splats/seed.sog',
    data: [['Photos', '613 (407 useful)'], ['Views', '36 / 36 registered'], ['X step', '0.984 mm'], ['SfM points', '298,411'], ['Reproj.', '0.32 px'], ['Mesh', '2.00 M triangles']],
  },
];
