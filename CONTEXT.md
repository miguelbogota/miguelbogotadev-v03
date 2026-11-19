# Project Context

This document is the durable technical and operating context for `miguelbogotadev-v03`. It is intended for contributors and coding agents who need to understand the product before changing it.

- Read [PRODUCT.md](./PRODUCT.md) for the audience, purpose, positioning, and brand commitments.
- Read [DESIGN.md](./DESIGN.md) for the visual language and interaction system.
- Read [AGENTS.md](./AGENTS.md) for repository rules, implementation conventions, and the definition of done.
- Read the owning module's `README.md` before changing a feature.

## Project at a glance

MiguelBogotaDev is a public engineering portfolio for peers reviewing Miguel Bogota's work. It is a product-shaped portfolio rather than a résumé-shaped landing page: the home route introduces Miguel, makes selected work searchable, and opens full project case studies without losing the browsing context. Canonical project URLs remain directly accessible and shareable.

The experience is intentionally small:

- no account, database, CMS, or first-party form;
- no application backend beyond thin Next.js request boundaries;
- project metadata and Markdown are published by the companion [`miguelbogotadev-api`](https://github.com/miguelbogota/miguelbogotadev-api) repository;
- Firebase Analytics is optional and privacy-limited;
- Firebase App Hosting is the production deployment target.

The portfolio must remain useful when analytics, project Markdown, remote imagery, or the interactive cat is unavailable. Project metadata failures are route-level failures; optional and progressive content should degrade locally.

## Runtime and toolchain

| Concern | Current choice | Notes |
| --- | --- | --- |
| Runtime | Node.js 22 or newer | `.nvmrc` is the local version recommendation. |
| Framework | Next.js 16 App Router | Cache Components and partial prefetching are enabled. |
| Rendering | React 19 | Server Components are the default; interactivity opts into client code. |
| Language | Strict TypeScript | No `any`, non-null assertions, or broad escape casts. |
| Styling | Root-level SCSS | Global tokens live in `styles`; component styles are colocated. |
| Content | Remote JSON and Markdown | Metadata is server-loaded; Markdown is browser-loaded on demand. |
| 3D | Three.js and React Three Fiber | Used only by the interactive profile cat. |
| Analytics | Firebase Analytics / GA4 | Production-only, lazy, sanitized, and optional. |
| Testing | Vitest, jsdom, Testing Library | Tests live beside module implementations. |
| Quality | ESLint, Prettier, TypeScript, Husky | CI exposes lint, build, and tests independently. |
| Hosting | Firebase App Hosting | Uses native Next.js framework inference. |

The primary commands are:

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
npm run format
```

`npm run build` explicitly uses webpack. The complete local release gate is lint, typecheck, build, and tests. Husky currently runs lint, build, and tests before a commit.

## Repository map

The application lives at the repository root. A `src` directory is intentionally not used.

```text
app/                  Next.js routes, layouts, metadata routes, and internal API
modules/              Singular domain and shared modules
styles/               Global Sass entry points, semantic tokens, reset, and base rules
tests/                Shared test renderer and reusable fixtures
public/               Static assets such as the favicon and fallback social card
.github/               Issue templates, pull-request template, and quality workflow
.husky/                Local pre-commit quality gate
```

Each module owns a root `index.ts`, a `README.md`, and only the folders it needs. Every component has its own folder containing its implementation, styles, export, and test when meaningful. The root module index is its public boundary; internal files should not be exported without an external caller.

### Module ownership

| Module | Owns | Public boundary |
| --- | --- | --- |
| `analytics` | Sanitized events, Firebase adapter, route tracking, analytics notice | `AnalyticsNotice`, `AnalyticsTracker`, `analyticsService` |
| `profile` | Introductory copy, portrait, interactive Three.js cat | `ProfileSection` |
| `project` | Project contract, server metadata access, browser Markdown access, drawer, project presentation | `Project`, `Drawer`, `ProjectInfo`, drawer navigation helpers |
| `seo` | Home, privacy, project, manifest, robots, and sitemap metadata | `seoService` |
| `shared` | Layout primitives, navigation, footer, errors, state, hooks, shared configuration | Root `index.ts` exports |
| `social` | Contact copy and external social links | `SocialSection` |
| `theme` | Theme domain, cookie persistence, and picker | `Theme`, `ThemePicker`, `themeService` |
| `work` | Search, filtering, pagination, and project cards | `WorkSection` |

## Route map

| Route | Rendering and responsibility |
| --- | --- |
| `/` | Server-loads cached project metadata and theme cookie; composes profile, work, social, footer, and drawer. |
| `/project/[projectId]` | Canonical project route. Resolves cached metadata, builds project SEO, and lets the browser progressively load Markdown. |
| `/privacy` | Static explanation of storage, sanitized analytics, diagnostics, providers, and browser controls. |
| `/api/project/[projectId]/content` | Internal backend-for-frontend route that proxies and sanitizes project Markdown failures. |
| `/manifest.webmanifest` | Typed Next.js metadata route backed by `seoService`. |
| `/robots.txt` | Typed crawler policy backed by `seoService`. |
| `/sitemap.xml` | Cached project-driven public route inventory backed by `seoService`. |

`app/layout.tsx` owns the document language, Barlow font, theme attribute, Boxicons stylesheets, global metadata base, analytics tracker, and analytics notice. Route files should remain thin: Next.js conventions stay in `app`, reusable logic stays in modules.

The root and home exports set `instant = false` because their document shell depends on the request's theme cookie. The project route also opts out of instant-navigation validation because `notFound()` intentionally replaces the segment. These exports are version-specific decisions; consult the local Next.js 16 documentation before changing them.

## Rendering and data flow

### Home request

1. `app/page.tsx` calls `getCachedProjects()` and `cookies()` in parallel.
2. `getCachedProjects()` is a Cache Component function using the named `projects` cache profile.
3. The profile defines 5 minutes stale, 15 minutes revalidation, and 24 hours expiry.
4. The server passes projects directly to `WorkSection` and provides projects plus the resolved theme to `AppStateProvider` for drawer behavior.
5. Search, pagination, theme selection, the cat, analytics, and drawer navigation hydrate as focused client islands.

The Next.js cache is the authoritative project-index cache. Do not add a parallel client fetch for the index or an extra in-memory cache without evidence that the framework cache is insufficient.

### Canonical project request

1. `generateStaticParams()` returns IDs from the current cached project index.
2. Cache Components also allow a project ID added after deployment to resolve on its first request; there is no legacy `dynamicParams` export.
3. `resolveProject()` converts a `RequestError` with code `404` into `notFound()` and rethrows other failures to the segment error boundary.
4. `generateMetadata()` and the page use the same cached project lookup.
5. The route renders metadata immediately and mounts `ProjectInfo`; no route-level loading file is needed for Markdown.

### Progressive Markdown

Long-form content is intentionally absent from the home payload and server-rendered project shell. When either the drawer or canonical page mounts `ProjectInfo`:

```text
ProjectInfo
  -> projectClient.getContent({ id })
  -> GET /api/project/{encoded-id}/content
  -> projectService.getContent({ id })
  -> upstream /projects/{encoded-id}.md
  -> remove YAML frontmatter
  -> return text/markdown
  -> react-markdown renders safe Markdown
```

The browser sees the internal API route but not the upstream URL construction or raw upstream error. The internal route maps missing content to a sanitized `404` message and all other failures to a sanitized unavailable response. Raw HTML is not enabled in `react-markdown`.

`ProjectInfo` resets its image and content state when the project ID changes. While Markdown loads it shows a local skeleton matching the reading measure. Missing and temporary failures use different, short user-facing messages. This local progressive state is distinct from a Next.js route `loading.tsx` boundary.

## Navigation and state

The home page has three anchor sections: `profile`, `work`, and `social`. The fixed navigation uses a scroll-spy hook to mark the active section and positions a two-pixel amber indicator below its link. The logo removes the current fragment and scrolls smoothly to the top.

Project drawer navigation deliberately does not use intercepted App Router routes:

- a project card prevents the normal link transition, pushes `/project/{id}` into browser history, and opens the matching project in the drawer;
- `useDrawerRouting()` synchronizes drawer state with browser back and forward events;
- closing the drawer navigates to `/` and restores focus to the previously active element;
- the canonical route remains a normal directly accessible page;
- links returning home preserve `scroll={false}` where browser restoration caused unwanted movement.

`AppStateProvider` is intentionally small. It owns the server-provided project list and theme plus the current project ID, drawer-open state, and current client theme. Work filtering and pagination remain local to `WorkSection` rather than becoming global state.

## Theme and presentation bootstrapping

Supported themes are `light`, `dark`, and `system`. The root layout reads the `theme` cookie on the server and places the result on `html[data-theme]`, so the first render does not require an inline theme initialization script. `ThemePicker` updates the DOM attribute, shared state, cookie, and sanitized analytics event together.

The cookie is site-wide and `SameSite=Lax`. A missing value resolves to `system`. Theme variables are defined in `styles/_variables.scss`; components consume semantic values such as `--text-primary` and `--background-sheet`, not theme-specific raw colors.

## Error and resilience model

`RequestError` is the request-boundary error contract. It carries a readable message and numeric HTTP-style `code`; it is not a general domain-result abstraction.

| Failure | Handling |
| --- | --- |
| Unknown public route | Root `not-found.tsx` renders the shared `ErrorPage`. |
| Unknown project ID | Cached lookup throws `RequestError(404)`; route invokes project `notFound()`. |
| Project route failure | Segment `error.tsx` logs the opaque Next.js digest and offers `reset()`. |
| Root rendering failure | `global-error.tsx` delegates to the shared standalone `GlobalError`. |
| Markdown missing | `ProjectInfo` shows a project-details-not-found status. |
| Markdown temporary failure | `ProjectInfo` shows a temporary-unavailable status and logs a fixed exception category. |
| Cat failure | A local shared error boundary prevents the profile from taking down the page. |
| Analytics unsupported or unconfigured | Initialization returns `null`; product behavior continues. |

Do not expose upstream response bodies, paths, error messages, stacks, or user-entered values to the browser or analytics. Keep recovery actions observable and accessible.

## SEO and public identity

`seoService` is the single metadata builder. Route files provide Next.js exports and data; they do not reconstruct metadata objects.

- `SITE_URL` is `http://localhost:3000` outside production and `https://miguelbogota.dev` in production. It belongs to the shared module and intentionally has no custom environment override.
- Home and privacy routes have canonical paths and use `/images/social-card.png`.
- A project uses its first published image for Open Graph and X/Twitter previews; projects without an image use the fallback 1200 x 630 card.
- `metadataBase` resolves relative canonical and media paths.
- Sitemap entries include home, privacy, and every project in the cached index.
- Robots allow public crawling and publish the canonical sitemap and host.
- Manifest colors are a white background and black theme, matching the core monochrome identity.

When project data changes, verify its ID, summary, tags, first image, image alternative, and dates; all of them affect routing, discovery, or social previews.

## Analytics and privacy boundary

Production lazily initializes Firebase Analytics only in a supported browser with the required public web configuration. Development prints sanitized events with an `[analytics]` prefix. Tests stay silent. Automatic Firebase page views are disabled so `AnalyticsTracker` owns exactly one sanitized page view per pathname.

Allowed custom signals are:

- pathname-only page views;
- project ID opens;
- known navigation destinations;
- allowlisted link category and stable link ID;
- the fact that project search was used, never its text;
- selected theme;
- fixed exception area and fatal flag.

Never collect query strings, fragments, search terms, DOM text, raw errors, stacks, complete outbound URLs, user IDs, exact coordinates, or user-entered values. GA4 Enhanced Measurement for outbound clicks, site search, and form interactions must remain disabled because those automatic events can bypass this allowlist.

The analytics notice is informational and has one **OK** button. Dismissal in local storage means only that the notice has been seen; it is not consent and does not enable or disable analytics. The privacy page must be updated whenever collected categories, storage, providers, or retention behavior change.

### Public environment values

Analytics may receive these browser-visible values from the runtime environment:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

They identify the Firebase web application; they are not server secrets. Do not commit concrete environment values. Missing configuration must leave analytics disabled without affecting the site.

## Accessibility and interaction requirements

- All actions must be reachable by keyboard with a visible two-pixel amber focus outline.
- The fixed navigation is offset by the main top padding and document scroll padding.
- Drawer focus is trapped while open, Escape closes it, and focus returns to its origin.
- Controls use labels or accessible names; decorative icons are hidden from assistive technology.
- The cat supports horizontal drag, touch activation, and Left/Right arrow rotation.
- Critical behavior may not depend on hover; touch and mobile treatments must remain usable.
- Project artwork and content skeleton animation stop under `prefers-reduced-motion: reduce`.
- Published project and profile images need useful alternative text.
- Layouts must remain readable without horizontal page scrolling. Wide Markdown tables may scroll inside their own region.

The recurring mobile breakpoint is `750px`; the analytics notice stacks at `600px`. Test both sides of these boundaries, not only one representative phone and desktop size.

## Testing strategy

Tests live beside the behavior they verify. Shared state and project data come from `tests/fixtures`; the shared renderer is exported as `@/testing`.

Test:

- observable component behavior and accessible interaction;
- service success, failure mapping, and external boundaries;
- drawer history and focus behavior;
- filtering, pagination, theme persistence, and analytics sanitization;
- SEO service outputs rather than thin route wrappers;
- new non-trivial logic with a focused regression.

Do not test thin pages, layouts, metadata wrappers, documentation, or export-only files. Mock the network and SDK boundary rather than internal logic. Tests use Vitest globals, `describe`/`it`, and descriptions beginning with `should`.

## Delivery and source control

The production target is Firebase App Hosting. It infers the Next.js application from `package.json`; do not add generated `.apphosting` output or `apphosting.yaml` without a demonstrated runtime need. Never commit `.next`, `.output`, coverage, environment values, Firebase cache/debug files, or generated hosting bundles.

Migration phase branches merge into `feature/nextjs-migration`; that completed branch later merges into `latest`. Keep commits scoped and the tree free of generated output.

GitHub Actions starts for pull requests when they are opened or reopened and once more when a pull request is closed through a merge. It intentionally does not run for ordinary branch pushes. Lint, build, and tests are independent checks. The workflow has read-only repository content permission.

## Change maps

Use these paths as a starting point; always inspect current callers before editing.

| Change | Primary files | Also verify |
| --- | --- | --- |
| Add or change a project field | `modules/project/types/project.type.ts`, companion API index | fixtures, cards, details, SEO, tests, module README |
| Change project freshness | `next.config.ts`, `project.service.ts` | home, static params, sitemap, tests, local Next.js docs |
| Change Markdown behavior | project client/service, internal API route, `ProjectInfo` | privacy/security boundary, skeleton/error states, tests |
| Change drawer behavior | drawer component and routing hooks | history, focus restoration, canonical route, mobile |
| Change navigation | shared navigation and scroll-spy | hashes, fixed-header offset, analytics, keyboard behavior |
| Change theme | theme service/picker and global variables | server cookie read, light/dark/system, tests |
| Add analytics data | analytics service and Firebase adapter | privacy page, analytics README, allowlist, tests |
| Change route metadata | `seoService` | canonical URL, social image, sitemap, robots, manifest, tests |
| Change a component | owning component folder | styles, tests, module README, public export if externally used |
| Change global visual tokens | `styles/_variables.scss` | both themes, DESIGN.md, sidecar, affected components |

## Durable decisions and non-goals

- Keep the root-level architecture; do not introduce `src`.
- Keep modules singular and their public APIs narrow.
- Keep `app` thin and route-oriented.
- Keep the browser-facing project endpoint internal to the application; it is a boundary, not a secret.
- Keep long-form Markdown client-loaded when a project opens.
- Keep browser-history drawer routing unless the product decision explicitly changes.
- Keep native Next.js metadata routes and the centralized SEO service.
- Keep Firebase configuration optional and runtime-provided.
- Do not add a CMS, database, global state library, UI framework, icon component dependency, or generic request abstraction without a demonstrated problem.
- Do not add compatibility layers for deleted Vite/Nitro behavior.
- Do not fabricate testimonials, metrics, employers, outcomes, or project evidence.

## Verification checklist

Before handing off a meaningful change:

1. Read this file, `AGENTS.md`, and the owning module README.
2. Confirm server/client boundaries and whether the change affects privacy or SEO.
3. Run the smallest focused tests while implementing.
4. Verify light, dark, system, desktop, mobile, keyboard, and reduced-motion behavior when relevant.
5. Run the complete gate:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npm test
   ```

6. Update module documentation, this context, `DESIGN.md`, and privacy copy when their contracts have changed.
7. Check `git status` for generated files and unrelated edits.

## Glossary

- **Canonical project route:** The directly accessible `/project/{id}` page used for sharing and SEO.
- **Drawer route:** The same canonical URL represented as an in-page drawer during home browsing.
- **Project index:** Upstream `index.json` containing all published project metadata.
- **Progressive content:** Long-form Markdown requested only after project details open.
- **Internal API:** A same-origin Next.js route that protects upstream structure and sanitizes errors; it is visible to browser developer tools.
- **Cache Components:** The Next.js 16 caching model used by the named project cache profile.
- **Informational notice:** The analytics disclosure with an acknowledgment button, not a consent gate.
