# Architecture

## Who the site serves

The main reader is a recruiter or hiring engineer with little time. Everyone gets the same site, in layers, and can stop at any point with a complete picture.

| Time | Where | What they get |
|---|---|---|
| 10 s | Home, first screen | Who you are, what you build, when you're available, whether you can work there, one interactive piece of real output |
| 1 min | Home, scrolling | Project rows, key numbers, skills matrix that links to evidence |
| 5 min | Top of a project page | Problem, role, status, stack, numbers |
| 15+ min | Project chapters, log | Engineering depth and the interactive pieces |

A **CV PDF** button stays in the header on every page, so nobody has to hunt for it.

## Site map

```
/                     Home: identity, facts, work rows, numbers, skills matrix, latest log
/work/                All projects, filter by discipline, smaller work as expanding rows
/work/<project>/      Project page: same brief on top, then chapters
/log/                 Dated build notes, decisions, failures
/log/<post>/          One note, linked to its project
/cv/                  Web CV, which also prints to the PDF
/shotlist             Dev only: every missing asset and to-do
```

Three navigation items is deliberate: Work, Log, CV. Contact details are in the footer of every page except the CV, which has them in its header.

**Why Log is separate from Work:** project pages are the polished story and should stay stable. The log is where you can post often and show how you think, without having to reshape a project page each time. Posts appear on their project's page automatically.

## Project page pattern

1. **Brief, always the same:** problem, role, status, stack, stats. This comes from the file's header, so it can't be skipped.
2. **Chapters:** full-width sections in alternating tones. The side rail is generated from them automatically.
3. **An honest section:** the robot page ends with "What isn't solved yet". Engineers trust this more than a clean story, and it answers the questions they'd ask anyway.

## No carousels

Media sits next to the text it explains. In order of preference:

| Need | Component |
|---|---|
| Compare two states | `Wipe`, `DesignToReality` |
| Pick a sample or view | `ScanExplorer` |
| Explain a screenshot or render | `Hotspots` |
| Show how something comes apart | `ScrollExplode` (flat layers), `ScrollSequence` (rendered frames) |
| Let them handle it | `Viewer3D` |
| Show motion | `Video` |
| Support a paragraph | `Figure`, `Split`, `Gallery` |

## Design system

- **Black, white, concrete.** Colour only comes from the work itself, so the scans stand out.
- **Type:** Doto (your CV's dot-matrix face) for the name and numbers, Archivo Condensed for headings and body in Archivo, IBM Plex Mono for labels and data.
- **The name block** comes straight from your CV: white name, then an offset white bar.
- **Hard structure:** visible rules, square corners, no shadows, no gradients. Hovering inverts black and white.
- **Concrete tie holes** in the footer echo the dots of the name.
- **LABEL | content rows** carry over from your CV and PDFs.

## Technical decisions

| Decision | Why |
|---|---|
| Astro + MDX | Pages are mostly static and fast, with text and components mixed in one file. It ships no JavaScript except on interactive elements |
| Custom elements, no framework | Each interaction is one small file, with no framework to learn or keep updated |
| three.js + Spark, loaded on click | The 3D libraries and models are large, so they load only if a visitor asks |
| Images in `src/media/`, heavy files in `public/media/` | Images are resized and converted at build. Video and 3D files must be served untouched. To move heavy files to a CDN, set `PUBLIC_MEDIA_BASE` |
| A missing asset never breaks the build | You can publish early and add media gradually. On the live site a placeholder says "Media in preparation" |
| GitHub Pages | Free and matches your plan. Limits to watch: 1 GB for the site and 100 MB per file. If video outgrows that, use Cloudflare R2 with `PUBLIC_MEDIA_BASE` |

## Accessibility and fallbacks

Everything works by keyboard, and the wipe divider responds to arrow keys. Visitors with reduced motion get static versions of the scroll pieces. Touch scrolling only moves a divider if it starts on that divider.

## File map

```
src/content/work/      Project pages (MDX)
src/content/log/       Log posts (MDX)
src/data/              CV, site facts, skills matrix, scans, smaller work
src/components/media/  Interactive and media components
src/components/doc/    Chapter, Split, Stats, Specs, Compare, Pipeline, Todo
src/components/site/   Header, Footer, rows, skills matrix
src/components/mdx.ts  Components available in MDX without importing
src/scripts/           The behaviour behind the interactive components
src/layouts/           Base page and project page
src/styles/global.css  Design tokens and shared styles
src/media/             Photos, renders, screenshots
public/media/          Video, frames, splats, GLB, SVG layers
tools/                 Texture, stand-in and CV PDF generators
```
