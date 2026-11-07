# Pei-Wen (Lisa) Wang

Personal site: [https://lisa-0831.github.io/](https://lisa-0831.github.io/)

One React app for Pei-Wen (Lisa) Wang, a software engineer in New York. The portfolio covers cloud and backend systems, shaped by experience across product, marketing, and research. Travel pages sit beside it.

## Pages

- **Portfolio** — [https://lisa-0831.github.io/#life](https://lisa-0831.github.io/#life)
- **Travel journal** — [https://lisa-0831.github.io/#travel](https://lisa-0831.github.io/#travel)
- **Fall 2026 Southwest plan** — [https://lisa-0831.github.io/#2026-fall-southwest](https://lisa-0831.github.io/#2026-fall-southwest)

The portfolio has five sections:

- **Intro** — A short introduction, and current studies toward an MS in Information Systems & Computer Science at Cornell
- **Engineering in production** — Results from Cloud Software Engineer work at Ubiquiti
- **Selected projects** — [UnicornLL](https://github.com/lisa-0831/unicorn-ll) and [Pi Course](https://github.com/lisa-0831/Online-Learning-Platform)
- **Journey** — Career path, a BA from National Taiwan University, and tools used day to day
- **Contact** — Email, [LinkedIn](https://www.linkedin.com/in/peiwenwang0831), and [GitHub](https://github.com/lisa-0831)

The travel journal is a map of visited states. Nevada, Utah, and Arizona are marked planned and link to the Southwest itinerary. That plan lives at `#2026-fall-southwest`.

## Stack

React 19, TypeScript, Vite, and Tailwind CSS v4.

- Portfolio content is in `src/App.tsx`, with styles in `src/index.css` and images in `public/assets/`.
- The shared top bar (the `LW.` row) is also in `src/index.css`.
- Planned trips live under `src/travel/plans/`. The Southwest plan is `src/travel/plans/2026-fall-southwest/`.
- Visited-state photos are in `public/travel/states/`. Trip photos are in `public/travel/plans/2026-fall-southwest/photos/`.

## Local development

Requires Node.js 22 and pnpm 10 (versions are pinned in `.mise.toml`).

```bash
pnpm install
pnpm dev
```

The dev server runs at [http://localhost:8443](http://localhost:8443). Edits under `src/` hot-reload.

Other scripts:

```bash
pnpm build     # write static files to dist/
pnpm preview   # preview the production build
pnpm format    # format with oxfmt
```
