# Repository guide for agents

## Purpose

Keep this portfolio small, readable, and consistent with its current Next.js 16 architecture. Read the code and the owning module README before changing a feature. Prefer deleting stale code over adding compatibility layers.

## Stack and commands

- Next.js 16 App Router with Cache Components
- React 19 and strict TypeScript
- SCSS with root-level shared styles
- Vitest and Testing Library
- Firebase Analytics for sanitized browser events
- Firebase App Hosting as the deployment target

Use the existing scripts:

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
npm run format
```

Husky runs lint, build, and tests before a commit. GitHub Actions exposes those as three independent checks when a pull request is opened, reopened, or merged. Ordinary branch pushes do not start CI.

## Repository structure

The application lives at the repository root. Do not introduce a `src` directory.

```text
app/                  Next.js routes, layouts, metadata routes, and internal API
modules/              Domain and shared modules
styles/               Global Sass entry points, tokens, reset, and base rules
tests/                Shared renderer and fixtures
public/               Static assets
docs/                 Historical migration evidence
```

`app` should remain thin. Route files compose modules and implement Next.js conventions; feature logic belongs in the owning module.

## Module boundaries

Each domain is singular and owns a root `index.ts`, a `README.md`, and only the folders it needs:

```text
modules/example/
├── README.md
├── index.ts
├── components/
│   └── example/
│       ├── index.ts
│       ├── example.component.tsx
│       ├── example.styles.scss
│       └── example.test.tsx
├── services/
├── hooks/
├── utils/
├── config/
└── types/
```

- Export the module's public API from its root `index.ts`.
- Keep internal files private; do not add exports that have no external caller.
- Put every component in its own folder, even when it is the module's only component.
- Keep component styles and tests beside the component.
- Use `constants.ts` and similarly direct names instead of redundant prefixes.
- Update the module README when responsibilities, public APIs, or files change.
- `styles/README.md` and `tests/README.md` define the shared styling and testing conventions.

## Current module ownership

- `analytics`: sanitized Firebase events, page tracking, and the informational notice.
- `profile`: profile copy and the interactive Three.js cat.
- `project`: project types, server metadata access, browser Markdown access, drawer, and project details.
- `seo`: home, privacy, project, manifest, robots, and sitemap metadata.
- `shared`: cross-module layout, navigation, state, hooks, constants, and request errors.
- `social`: contact copy and external social links.
- `theme`: supported themes, cookie persistence, and picker UI.
- `work`: project search, pagination, and card presentation.

## Next.js and data flow

Read the relevant documentation under `node_modules/next/dist/docs/` before changing Next.js behavior; this version may differ from remembered APIs.

- The root layout reads the theme cookie on the server.
- The home route loads the cached project index and passes projects to the work module and shared provider.
- `getCachedProjects()` and `getCachedProject()` own Next.js server caching with a 15-minute revalidation profile.
- Project routes use `generateStaticParams()` for known projects. Runtime project IDs remain supported by Cache Components without a legacy `dynamicParams` export.
- Long-form Markdown is intentionally client-loaded only after a project opens.
- Browser code requests Markdown through `/api/project/[projectId]/content`; only the server service knows the upstream content URL.
- Do not expose upstream paths or raw upstream failures to the browser.
- Use `RequestError` at request boundaries where callers need the HTTP-style status code.

## Drawer navigation

The project drawer intentionally uses lightweight browser-history navigation rather than intercepted App Router routes.

- Project cards push the canonical `/project/{id}` URL and open the drawer.
- The canonical project route remains directly accessible and shareable.
- `useDrawerRouting()` handles browser back and forward events.
- Preserve `scroll={false}` on links returning to the home route where it prevents unwanted restoration.
- Do not reintroduce intercepted routes unless the product decision changes.

## SEO

- Use `seoService` for route metadata instead of rebuilding metadata in route files.
- Home and privacy pages use their canonical URLs and shared fallback social card.
- Project metadata uses the project's first image and falls back to `public/images/social-card.png`.
- `SITE_URL` belongs to the shared module and switches between localhost and production from Next.js build mode; do not add a custom site-URL environment variable.
- Keep `manifest.ts`, `robots.ts`, and `sitemap.ts` as typed Next.js metadata routes.

## Analytics and privacy

- Development logs sanitized events; tests stay silent; production loads Firebase lazily in supported browsers.
- Never collect search text, DOM text, raw errors or stacks, complete outbound URLs, query strings, fragments, user IDs, exact coordinates, or user-entered values.
- Keep automatic Firebase page views disabled so the application records one sanitized page view per pathname.
- The analytics notice is informational and has one **OK** button. It is not an accept/reject control.
- Keep the privacy page aligned with the data actually collected.
- Firebase public web configuration may be provided by the runtime environment. Do not commit environment values or add hosting configuration without a demonstrated need.

## Components and TypeScript

- Reuse existing components, services, and native platform APIs before adding code or dependencies.
- Keep components focused and move reusable behavior into the owning module.
- Do not destructure component props in the function parameter. Name `props`, document it, then destructure inside the function.
- Preserve strict TypeScript. Do not bypass types with `any`, non-null assertions, or broad casts.
- Prefer early returns to deeply nested conditions.
- Do not add validation for trusted internal values. Keep validation and sanitized errors at external boundaries.
- Prefer private classes with one exported instance for stateful services, matching `themeService`, `projectService`, `analyticsService`, and `seoService`.
- Avoid new dependencies when the platform or an installed dependency already solves the problem.

## JSDoc

Document every top-level function, class, component, type, and significant constant. A simple declaration may use one line:

```ts
/** Returns the published project index. */
```

Use the full form when parameters, type parameters, return behavior, or public usage need explanation:

````ts
/**
 * Renders a project card.
 *
 * @example
 * ```tsx
 * <ProjectCard project={project} />
 * ```
 *
 * @template T - The project subtype rendered by the component.
 * @param props - Project-card properties.
 * @returns The interactive project summary.
 */
````

- Add `@param` for every parameter and `@template` for every type parameter.
- Add a practical fenced `tsx` example for public declarations when usage is not obvious.
- Give every overload its own JSDoc describing that signature; document the implementation signature generally.
- Comments should explain contracts or non-obvious reasons, not restate syntax.

## Styling

- Global Sass belongs in `styles`; feature styles belong beside their component.
- Reuse tokens and breakpoints from `styles/_variables.scss`.
- Keep selectors nested beneath a strict component parent and prefer semantic elements over extra class names.
- Do not use BEM.
- Avoid global overrides and inline styles unless the value is genuinely dynamic.
- Preserve light, dark, system, desktop, and mobile behavior when changing shared presentation.

## Tests

- Keep tests beside the implementation and use the shared exports from `@/testing`.
- Use fixtures from `tests/fixtures` for shared state and project data.
- Use `describe` and `it`; test descriptions begin with `should`.
- Vitest globals are enabled; do not import `describe`, `it`, or `expect` unless a file has a specific reason.
- Prefer accessible queries and observable behavior over implementation details.
- Mock network and SDK boundaries, not the logic under test.
- Keep `app` thin and do not test simple pages, layouts, or metadata wrappers. Move meaningful logic into a module and test it there.
- New non-trivial logic needs a focused test. Trivial documentation, exports, and configuration changes do not.

## Git, CI, and generated files

- Phase branches merge into `feature/nextjs-migration`; the completed migration branch later merges into `latest`.
- Keep commits scoped and keep the working tree free of generated output.
- Do not commit `.next`, `.output`, `.apphosting`, coverage, environment values, or Firebase debug files.
- Firebase App Hosting can infer the Next.js build. Do not add generated bundles or `apphosting.yaml` without a demonstrated runtime requirement.
- Before handing off a change, run checks in proportion to risk. The complete local gate is:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

## Definition of done

- The smallest complete change is implemented.
- Callers, exports, tests, fixtures, and documentation remain consistent.
- Accessibility, privacy, and request-boundary behavior are preserved.
- Required checks pass.
- No unrelated cleanup or speculative abstraction is included.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
