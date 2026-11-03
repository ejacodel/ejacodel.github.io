// Prints the /cv page to public/cv/Enrique_Acosta_CV.pdf with Edge or Chrome, in headless mode.
// Needs a running site, so start `npm run dev` in another terminal first.
//   npm run cv:pdf            (uses http://localhost:4321)
//   npm run cv:pdf -- <url>
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.argv[2] ?? 'http://localhost:4321/cv/';
const output = resolve('public/cv/Enrique_Acosta_CV.pdf');
mkdirSync('public/cv', { recursive: true });

const browser = [
  process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((path) => path && existsSync(path));
if (!browser) throw new Error('Edge or Chrome not found. Set the BROWSER variable to its path.');

execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=8000',
  `--print-to-pdf=${output}`, url,
], { stdio: 'ignore' });
console.log('Wrote', output);
