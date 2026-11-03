/**
 * The skills matrix on the home page. Recruiters search by skill, not by project,
 * so each dot is a link to the evidence. Only add a dot if the project page proves it.
 */
export const columns = [
  { id: 'robot', label: 'Robot', href: '/work/macro-photogrammetry-robot/' },
  { id: 'dispenser', label: 'Dispenser', href: '/work/liquid-dispenser/' },
  { id: 'flash', label: 'Flash', href: '/work/smart-flash/' },
  { id: 'idea', label: 'IDEA', href: '/work/idea/' },
  { id: 'freelance', label: 'Freelance', href: '/work/#small' },
];

export const capabilities: { name: string; detail: string; in: string[] }[] = [
  { name: 'CAD and mechanical design', detail: 'SolidWorks, Fusion 360, Inventor, Rhino', in: ['robot', 'dispenser', 'idea', 'freelance'] },
  { name: 'Precision motion', detail: 'Ball screws, MGN rails, capstan, belts, preloaded bearings', in: ['robot'] },
  { name: 'Fabrication', detail: 'FDM, SLA, CNC, manual lathe, Fusion CAM', in: ['robot', 'dispenser', 'idea', 'freelance'] },
  { name: 'PCB design', detail: '4-layer KiCad, Altium, JLCPCB', in: ['flash'] },
  { name: 'Electronics and hand assembly', detail: 'Down to 0402 and QFN, bring-up', in: ['robot', 'dispenser', 'flash', 'idea'] },
  { name: 'Embedded firmware', detail: 'STM32, ESP32, C++, PlatformIO (AI-assisted)', in: ['robot', 'dispenser', 'flash', 'idea'] },
  { name: 'Sensing and feedback', detail: 'Load cells, HX711, StallGuard', in: ['robot', 'dispenser'] },
  { name: 'Lab automation and fluidics', detail: 'Peristaltic pumps, gravimetric dosing', in: ['dispenser'] },
  { name: 'Computer vision and 3D', detail: 'COLMAP, RoMa, ArUco, TSDF, Gaussian splatting', in: ['robot', 'freelance'] },
  { name: 'Application software', detail: 'Python, JavaScript, C# (AI-assisted)', in: ['robot', 'flash'] },
  { name: 'Suppliers and manufacturing', detail: 'Chinese suppliers, PCB fabrication', in: ['flash', 'idea'] },
];
