# MiguelBogotaDev V03

My personal portfolio, built with Next.js 16, React 19, TypeScript, and an arguably unreasonable amount of care for a website whose primary job is to say, “Hello, I write software.”

[Visit miguelbogota.dev](https://miguelbogota.dev)

## What is this?

This repository contains the frontend for my portfolio. It introduces who I am, presents selected projects, provides searchable and paginated work history, and includes an interactive cat because every serious engineering portfolio needs at least one completely serious WebGL cat.

The application is currently being migrated from a Vite/Nitro React application to the Next.js 16 App Router. The migration is intentionally split into phases so each piece can be reviewed, tested, and blamed independently.

## Highlights

- Next.js 16 App Router with Cache Components.
- Server-loaded project metadata with a 15-minute revalidation window.
- Client-loaded Markdown when project details are opened.
- Light, dark, and system themes persisted with a cookie.
- Searchable and paginated project cards.
- Drawer-based project navigation retained during the routing migration.
- Canonical metadata, sitemap, robots, manifest, and 1200×630 social previews.
- Privacy-limited Firebase Analytics with an informational notice and privacy page.
- Responsive layouts for desktop and mobile.
- Interactive Three.js cat model. This is a feature, not a cry for help.
- Modular architecture with documentation close to the code it explains.
- ESLint, Prettier, TypeScript, Vitest, and Husky guarding the doors.

## Tech stack

| Area           | Technology                     |
| -------------- | ------------------------------ |
| Framework      | Next.js 16                     |
| UI             | React 19                       |
| Language       | TypeScript                     |
| Styling        | SCSS                           |
| 3D             | Three.js and React Three Fiber |
| Content        | Remote JSON and Markdown       |
| Analytics      | Firebase Analytics (GA4)       |
| Testing        | Vitest and Testing Library     |
| Quality        | ESLint, Prettier, and Husky    |
| Hosting target | Firebase App Hosting           |

## Getting started

You need Node.js 22 or newer. The repository currently recommends Node.js 24 through `.nvmrc`.

```bash
nvm use
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the page works on the first try, please remain calm; this is known to happen occasionally.

Project metadata and Markdown are loaded from the companion [`miguelbogotadev-api`](https://github.com/miguelbogota/miguelbogotadev-api) repository. The portfolio still runs without local environment variables; Firebase Analytics stays disabled until the documented `NEXT_PUBLIC_FIREBASE_*` values are provided. The shared site URL uses localhost in development and the public domain in production without additional configuration. Copy `.env.example` to `.env.local` when configuring Firebase.

## Available commands

| Command             | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Start the Next.js development server.                    |
| `npm run build`     | Create the production build with webpack.                |
| `npm run start`     | Run the production build locally.                        |
| `npm run typecheck` | Generate route types and check TypeScript.               |
| `npm test`          | Run the complete Vitest suite once.                      |
| `npm run lint`      | Run ESLint with zero warnings allowed. It has standards. |
| `npm run format`    | Format the repository with Prettier.                     |

## Project structure

The application lives at the repository root; there is intentionally no `src` directory.

```text
app/                  Next.js routes and layouts
modules/
  analytics/          Firebase Analytics, typed events, and notice
  profile/            Introduction and interactive cat model
  project/            Project domain, data services, drawer, and details
  seo/                Canonical search and social metadata
  shared/             Reusable UI, state, hooks, configuration, and errors
  social/             Contact copy and social links
  theme/              Theme persistence and picker
  work/               Search, pagination, and project-card presentation
styles/               Global tokens, reset, and base styles
tests/                Shared test renderer and fixtures
public/               Static assets
docs/                 Migration and project documentation
```

Each module exposes a small public API through its root `index.ts` and includes a README describing its responsibilities and files. Components own their styles and tests inside their component folders. In other words, files are encouraged to live near their friends instead of wandering the repository alone at night.

## How project content works

The home route loads project metadata on the server and caches it through Next.js. The project service also keeps an in-memory copy for the lifetime of the current runtime to avoid unnecessary requests.

Long-form Markdown is intentionally fetched in the browser only when a project is opened. This keeps the home response focused and lets both the drawer and canonical project page show the loading skeleton immediately.

Request failures use a shared `RequestError`, allowing the UI to distinguish missing content from temporary service failures without consulting a crystal ball or comparing error-message punctuation.

## Analytics and privacy

Firebase Analytics records sanitized navigation paths and a small allowlist of project, navigation, link, search-use, theme, and exception events. Query strings, fragments, search terms, raw errors, full outbound URLs, and user-entered values are excluded. The notice is informational: **OK** dismisses it but is not a consent switch. The `/privacy` page describes the theme cookie, notice storage, analytics, and App Hosting diagnostics.

The GA4 web stream must keep Enhanced Measurement disabled for outbound clicks, site search, and form interactions so automatic collection cannot bypass the application allowlist. Analytics configuration and event details live in `modules/analytics/README.md`.

## Quality checks

Before opening a pull request, run:

```bash
npm run lint
npm run build
npm test
```

Husky runs the same lint, build, and test sequence before commits. GitHub Actions runs each check as a separate step when a pull request is opened or reopened against any branch, then once more after it is merged. Ordinary branch pushes do not start the workflow. It is less a guard dog and more a very polite bouncer that knows TypeScript.

## Migration status

This repository is actively moving to Next.js phase by phase. The home experience, root-level modules, canonical project routes, SEO metadata routes, privacy notice, and analytics foundation are migrated. The existing drawer remains intentionally simple; deployment polish and the remaining migration work are tracked in GitHub issues rather than hidden in a mysterious notebook nobody can find.

## Find me around the web

### Find me around the web

<p>
  <a href="https://miguelbogota.dev" target="_blank">
    <img height="26" src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/b0faa877d7b3ed4bb4e41b66ef922e59d2717f7e/images/web.svg" alt="Personal website" />
  </a>&nbsp;&nbsp;
  <a href="https://github.com/miguelbogota" target="_blank">
    <img height="26" src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/b0faa877d7b3ed4bb4e41b66ef922e59d2717f7e/images/github.svg" alt="GitHub" />
  </a>&nbsp;&nbsp;
  <a href="https://linkedin.com/in/miguelbogota" target="_blank">
    <img height="26" src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/b0faa877d7b3ed4bb4e41b66ef922e59d2717f7e/images/linkedin.svg" alt="LinkedIn" />
  </a>&nbsp;&nbsp;
  <a href="https://instagram.com/migue_bogota" target="_blank">
    <img height="26" src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/b0faa877d7b3ed4bb4e41b66ef922e59d2717f7e/images/instagram.svg" alt="Instagram" />
  </a>&nbsp;&nbsp;
</p>

Feel free to explore the repository, borrow an idea, report a bug, or say hello. If you find an undocumented feature, congratulations: it may be a bug wearing business casual.
