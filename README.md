# MiguelBogotaDev

My personal engineering portfolio, built with Next.js 16, React 19, TypeScript, and an entirely reasonable amount of care for a website whose main job is to say, “Hi, I build software.”

[Visit miguelbogota.dev](https://miguelbogota.dev)

## What is here?

The portfolio introduces who I am, presents selected projects, and lets visitors explore full case studies through a drawer or a directly shareable project page.

It includes:

- searchable and paginated project work;
- server-loaded and cached project metadata;
- progressively loaded Markdown case studies;
- light, dark, and system themes;
- project-specific SEO and social previews;
- privacy-limited Firebase Analytics;
- an interactive Three.js cat, because technical credibility has limits.

## Run it locally

Use Node.js 22 or newer. The recommended version is stored in `.nvmrc`.

```bash
nvm use
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Project metadata, Markdown, images, the résumé, and the cat models come from the companion [`miguelbogotadev-api`](https://github.com/miguelbogota/miguelbogotadev-api) repository.

Firebase Analytics is optional. Without its public environment configuration, the portfolio continues to work and analytics remains disabled.

## Commands

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npm run typecheck  # Generate route types and check TypeScript
npm run build      # Create a production build
npm test           # Run the Vitest suite
npm run format     # Format the repository
```

The complete local quality gate is:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

## Structure

The application lives at the repository root. There is intentionally no `src` directory.

```text
app/       Next.js routes, layouts, metadata routes, and internal API
modules/   Product and shared modules
styles/    Global Sass tokens, reset, and base rules
tests/     Shared test renderer and fixtures
public/    Static assets
```

Route files stay thin. Feature behavior belongs to singular modules with small public APIs, colocated components, styles, tests, and module-level documentation.

## Documentation

- [PRODUCT.md](./PRODUCT.md) — who the portfolio is for and what it should accomplish.
- [CONTEXT.md](./CONTEXT.md) — architecture, routes, data flow, privacy, SEO, testing, and deployment.
- [DESIGN.md](./DESIGN.md) — visual system, interaction patterns, components, and responsive rules.
- [AGENTS.md](./AGENTS.md) — repository conventions, module boundaries, JSDoc, TDD, and delivery rules.
- Module `README.md` files — the responsibility, public API, and files owned by each module.

If you need the full story, start with `PRODUCT.md`, continue with `CONTEXT.md`, and then read `DESIGN.md`. If you only want to run the project, this README has already done enough talking.

## Deployment

The production target is Firebase App Hosting. It detects the Next.js application from `package.json`, so the repository does not include generated hosting bundles or unnecessary hosting configuration.

## Explore

Feel free to explore the code, learn from it, or borrow an idea. Personal content, project material, and branding still belong to their respective owners. If you find an undocumented feature, it may be a bug wearing business casual.

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

Feel free to explore the repositories or reach out if something resonates.
