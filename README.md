# Pei-Wen (Lisa) Wang

Personal site for Pei-Wen (Lisa) Wang, a software engineer in New York. One page on cloud and backend systems, shaped by experience across product, marketing, and research.

The page has five sections:

- **Intro** — A short introduction, and current studies toward an MS in Information Systems & Computer Science at Cornell
- **Engineering in production** — Results from Cloud Software Engineer work at Ubiquiti
- **Selected projects** — [UnicornLL](https://github.com/lisa-0831/unicorn-ll) and [Pi Course](https://github.com/lisa-0831/Online-Learning-Platform)
- **Journey** — Career path, a BA from National Taiwan University, and tools used day to day
- **Contact** — Email, [LinkedIn](https://www.linkedin.com/in/peiwenwang0831), and [GitHub](https://github.com/lisa-0831)

## Stack

React 19, TypeScript, Vite, and Tailwind CSS v4. Page content lives in `src/App.tsx`, styles in `src/index.css`, and images and icons in `public/assets/`.

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
