# ejacodel.github.io

Portfolio, CV and project log of Enrique Acosta. Built with [Astro](https://astro.build) and MDX, and hosted for free on GitHub Pages.

## Run it

Move this folder **out of OneDrive first** (for example to `C:\dev\ejacodel.github.io`). `npm install` creates tens of thousands of small files that OneDrive would try to sync.

```
npm install
npm run dev
```

Then open <http://localhost:4321>, and <http://localhost:4321/shotlist> for your production board.

## Daily tasks

| I want to | Do this |
|---|---|
| See what media is still missing | Open `/shotlist` while `npm run dev` is running |
| Add a photo or render | Save it at the path shown on its placeholder (`src/media/...`). The placeholder is replaced automatically |
| Add a video, frames, splat or GLB | Same, but in `public/media/...`. Preparation recipes are in [docs/MEDIA.md](docs/MEDIA.md) |
| Edit a project | `src/content/work/<project>.mdx` |
| Add a project | Copy an `.mdx` file in that folder and change its header. It appears on the home and work pages |
| Write a log post | Add `src/content/log/<slug>.mdx`, and set `project:` to link it to a project |
| Edit the CV | `src/data/cv.ts`, then run `npm run cv:pdf` with the dev server running |
| Edit contact details or home-page facts | `src/data/site.ts` |
| Edit the skills matrix | `src/data/capabilities.ts` |
| Leave a note for yourself | `<Todo>...</Todo>` in any `.mdx`. It's yellow in dev and never published |
| Change colours or fonts | The tokens at the top of `src/styles/global.css` |

## Publish

1. Create a repo named `ejacodel.github.io` and push this folder to its `main` branch.
2. On GitHub, go to *Settings > Pages > Source* and choose *GitHub Actions*.

Each push to `main` then rebuilds and publishes the site. If the username differs, change `site` in `astro.config.mjs` and the links in `src/data/site.ts` and `src/pages/cv.astro`.

## More

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the site is structured and why.
- [docs/MEDIA.md](docs/MEDIA.md): how to produce each interactive element.
