# Repository guide for agents

## Start here

Before planning or changing this repository, read these files completely:

1. `PRODUCT.md` — audience, purpose, positioning, evidence, and brand commitments.
2. `CONTEXT.md` — architecture, routes, data flow, privacy boundaries, delivery, and durable decisions.
3. `DESIGN.md` — visual tokens, layout, components, responsive behavior, and design guardrails.
4. The `README.md` owned by every module or shared area the task may change.

Then inspect the relevant implementation, tests, callers, exports, and current Git diff. Do not plan from filenames or remembered framework behavior. If product, technical, and visual guidance conflict, stop and surface the conflict instead of silently choosing one.

Keep these documents current:

- Update `PRODUCT.md` when the audience, product purpose, positioning, evidence, or durable brand commitments change.
- Update `CONTEXT.md` when architecture, data flow, module ownership, privacy, delivery, or durable technical decisions change.
- Update `DESIGN.md` and `.impeccable/design.json` together when reusable visual tokens, components, or interaction rules change.
- Update an owning module's `README.md` when its responsibility, public API, files, or behavior changes.

## Working principles

- Implement the smallest complete vertical slice that satisfies the request.
- Preserve the root-level Next.js 16 architecture; never introduce a `src` directory.
- Prefer existing platform APIs, services, components, and dependencies.
- Delete stale paths instead of adding compatibility layers around them.
- Keep trusted internal code direct. Validate and sanitize at external boundaries.
- Preserve strict TypeScript, accessibility, privacy, SEO, theme, responsive, and reduced-motion behavior.
- Treat unrelated working-tree changes as user-owned. Do not rewrite or discard them.

## Test-driven development

TDD is the default workflow for features, fixes, refactors, and every change with executable behavior. Use short vertical **red → green → review** cycles rather than writing all tests or all implementation at once.

### 1. Establish the seam

Before writing a test, identify the public interface where behavior can be observed. Prefer these seams:

- component behavior through roles, names, visible state, focus, and user interaction;
- a module's exported function, hook, class instance, or service method;
- a network or SDK boundary through its public adapter;
- a pure utility through inputs and outputs.

Record the selected seam and the behavior it proves in the working plan or task update. If choosing a seam would change the public contract or module ownership, ask the user before proceeding. Otherwise, use the narrowest existing seam and continue.

### 2. Red

Write one focused test for one behavior. Run it and observe the expected failure before changing the implementation. A test that passes before the change is not a valid red state unless it is a characterization test supporting a separate failing test.

For a bug, reproduce the reported failure first. For a refactor, add characterization coverage only where the public behavior is not already protected.

### 3. Green

Write only enough production code to pass the failing test. Run the focused test and relevant nearby tests. Do not anticipate later slices, expand the public API speculatively, or test private details.

### 4. Repeat and review

Repeat one test and one minimal implementation at a time. After all requested behavior is green, review the complete diff and refactor only when it improves clarity without broadening scope. Keep the suite green during review.

### Non-executable changes

Documentation, comments, formatting, assets, simple exports, and declarative configuration may have no meaningful executable seam. Use a validation-first equivalent:

1. define the observable acceptance check before editing;
2. make the smallest change;
3. run the formatter, parser, build, targeted inspection, or other check that proves it.

Do not create tautological tests that assert documentation text, duplicate constants, or framework configuration merely to claim TDD. A behavior change hidden inside a configuration change still requires a failing behavioral test when a practical seam exists.

## Test quality

- Test behavior through public interfaces, not private methods or internal state.
- Make expected values independent literals or worked examples rather than recomputing them with the implementation's algorithm.
- Mock network, browser, timer, and SDK boundaries; keep owned logic real.
- Prefer accessible queries and observable outcomes over class names, snapshots, or DOM structure.
- Keep tests deterministic and focused on one reason to fail.
- Keep tests beside their implementation and use shared exports from `@/testing`.
- Put reusable state and project data in `tests/fixtures`.
- Use `describe` and `it`; test descriptions begin with `should`.
- Vitest globals are enabled; import them only when a file has a specific need.
- Keep `app` thin and do not test simple routes, layouts, metadata wrappers, exports, or documentation. Move meaningful behavior into its owning module and test it there.
- Read `tests/README.md` before changing test infrastructure or shared fixtures.

## Repository and dependency boundaries

The repository is organized by ownership, not technical layer:

```text
app/                  Thin Next.js routes, layouts, metadata routes, and internal API
modules/              Singular product and shared modules
styles/               Global Sass entry point, reset, semantic tokens, and base rules
tests/                Shared test renderer and cross-module fixtures
public/               Static assets
```

Apply these rules:

- `app` composes module APIs and implements Next.js file conventions. Feature logic belongs in a module.
- Imports between different modules use the target module's root public API, such as `@/modules/analytics`.
- Imports within the same module use relative paths.
- Avoid circular behavior, but do not add layers or abstractions merely to enforce a theoretical dependency hierarchy.
- Keep feature-specific types, constants, errors, and helpers in their owning domain. “Potentially reusable” is not enough reason to move code into `shared`.
- Browser code must not import server-only constants or services. Preserve explicit client/server boundaries.
- Route files may import an explicit server service entrypoint directly when exporting it through a browser-consumable root barrel would make the boundary unsafe. Treat this as a server-entrypoint exception, not general permission to bypass module APIs.
- When touching an existing cross-module private import, migrate it to the owning module's root public API.

## Module structure and public APIs

Every domain is singular and owns a root `index.ts`, a `README.md`, and only the folders it needs:

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

- Export the smallest intentional public API from the module root.
- Keep internal files private. An internal folder index may simplify imports inside its own module but does not make that API public.
- Add a root export only for a real external caller. Remove public exports that no longer have one.
- Put every component in its own folder, even when it is the module's only component.
- Keep a component's implementation, styles, tests, and local export together.
- Keep module-wide services, hooks, utilities, configuration, and types in their named folders.
- Use direct filenames such as `constants.ts`; avoid redundant names such as `project.constants.ts` inside the project module.
- Keep one responsibility per file. Split by behavior or ownership, not merely because a file is long.
- Prefer a private class with one exported instance for stateful services, matching the existing theme, project, analytics, and SEO services.
- Prefer a plain function for stateless behavior; do not create a class for namespacing alone.
- Do not add validation for values created and consumed entirely inside a trusted module.
- Update callers, root exports, tests, fixtures, and the module README in the same change.

Current ownership is documented in `CONTEXT.md`. Do not create a new module until the behavior has a distinct domain responsibility that cannot remain cohesive in an existing owner.

## Next.js and request boundaries

Read the relevant guide under `node_modules/next/dist/docs/` before changing routing, rendering, caching, metadata, fonts, images, or other Next.js behavior. This installed version is authoritative.

Preserve the durable flows in `CONTEXT.md`, especially:

- theme cookie resolution happens in the server layout;
- project metadata uses the named Cache Components profile;
- known projects use `generateStaticParams`, while runtime project IDs remain supported;
- long-form project Markdown loads in the browser only after project details open;
- browser Markdown requests use the internal project-content route;
- upstream URLs and raw upstream failures stay server-side;
- `RequestError` carries HTTP-style status information at request boundaries;
- the drawer uses browser-history navigation, while the canonical project route remains shareable;
- `seoService` owns route metadata, and typed Next.js files own manifest, robots, and sitemap exports.

Keep route handlers and browser clients defensive at external boundaries. Return sanitized failures to the browser. Keep trusted internal flows simple and typed.

## Components and TypeScript

- Name component parameters `props`. Document them, then destructure inside the function body.
- Keep components focused on presentation and interaction orchestration. Move reusable behavior to the owning module's service, hook, or utility.
- Prefer early returns to deep nesting.
- Preserve strict TypeScript. Use precise types and narrowing instead of `any`, non-null assertions, or broad casts.
- Treat type errors as design feedback. Do not weaken a contract to silence a caller.
- Reuse native platform behavior before implementing custom behavior.
- Add a dependency only when the platform and installed packages cannot solve the demonstrated need.

## JSDoc

Document every top-level function, class, component, type, interface, and significant constant. Documentation explains the contract, reason, or public use; it does not paraphrase syntax.

A simple internal declaration may use one line:

```ts
/** Returns the published project index. */
```

Use the full form when a declaration has parameters, type parameters, meaningful return behavior, errors, or public usage:

````ts
/**
 * Renders a project card that opens canonical project details.
 *
 * @example
 * ```tsx
 * <ProjectCard project={project} />
 * ```
 *
 * @template T - The project subtype rendered by the component.
 * @param props - Project-card properties.
 * @returns The interactive project summary.
 * @throws {RequestError} When required project content cannot be loaded.
 */
````

Apply these rules:

- Add `@param` for every parameter, including named `props`.
- Add `@template` for every type parameter.
- Add `@returns` when the return contract provides useful information.
- Add `@throws` for intentional errors callers may handle.
- Add a practical fenced `tsx` example for public declarations when usage is not obvious.
- Use the language that matches the example when `tsx` is not appropriate.
- Give every overload its own JSDoc explaining that signature; document the implementation signature as the general contract.
- Keep examples compilable in spirit and aligned with the module's public import path.
- Document private top-level declarations, but reserve long examples for public or non-obvious usage.
- Update JSDoc when behavior or signatures change; stale comments fail the change.

## Styling and design

Read `DESIGN.md` and `styles/README.md` before changing presentation.

- Global Sass belongs in `styles`; feature styles belong beside their component.
- Reuse semantic tokens and spacing from `styles/_variables.scss`.
- Keep selectors nested beneath a strict component parent and prefer semantic elements over extra class names.
- Avoid BEM and global feature overrides.
- Use inline styles only for genuinely dynamic values such as deterministic animation seeds.
- Preserve light, dark, system, desktop, mobile, keyboard, and reduced-motion behavior.
- Treat 750px as the primary compact breakpoint and 600px as the notice-specific stacking breakpoint unless the design system is intentionally revised.
- Keep amber scarce and semantic: focus, selection, links, or meaningful interaction feedback.
- Keep static content flat. Reserve shadows and glass for floating or transient layers.
- Verify visual changes in the rendered application at representative desktop and mobile sizes.
- Update `DESIGN.md` and `.impeccable/design.json` together when the reusable system changes.

## Accessibility and web interface guidelines

Accessibility is a release requirement, not a final polish pass. Include accessible behavior in the first TDD seam for every interactive component and preserve it through each red → green cycle.

When changing, reviewing, or auditing UI, use the installed `web-design-guidelines` skill. Before each review, fetch the latest rules from:

```text
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Apply every relevant rule to the changed files and report actionable findings in the guideline's required `file:line` format. Do not rely on a previously fetched copy because the upstream guidance may change. Resolve findings within scope before handoff; identify any intentionally deferred finding and its reason.

At minimum, verify:

- semantic HTML and a logical heading structure;
- complete keyboard operation with a logical focus order and no traps outside intentional modal containment;
- visible `:focus-visible` treatment that is not obscured by fixed navigation or floating surfaces;
- accessible names for controls, links, dialogs, regions, and icon-only actions;
- useful image alternatives and hidden decorative imagery or icons;
- native controls and links for their intended actions before adding ARIA roles;
- text and state contrast in light, dark, and system themes;
- controls that remain usable at touch sizes and without hover;
- status, loading, error, and validation feedback available to assistive technology;
- drawer focus containment, Escape behavior, background scroll locking, and focus restoration;
- reduced-motion behavior for continuous, decorative, or spatial animation;
- zoom, reflow, and readable content without page-level horizontal scrolling;
- mobile and desktop behavior on both sides of the documented breakpoints.

Prefer Testing Library role, name, focus, and interaction assertions for stable accessibility behavior. Automated checks support but never replace keyboard inspection and rendered visual review.

## Analytics, privacy, and SEO

- Keep analytics events pseudonymous and allowlisted.
- Never send search text, DOM text, raw errors or stacks, complete outbound URLs, query strings, fragments, user IDs, exact coordinates, or user-entered values.
- Keep automatic Firebase page views disabled; the application records one sanitized pathname view.
- Keep the informational notice as one **OK** acknowledgment, not an accept/reject control.
- Update the privacy page and analytics README in the same change whenever collection, storage, providers, or retention behavior changes.
- Keep Firebase public web configuration optional and runtime-provided. Never commit environment values.
- Use `seoService` rather than rebuilding metadata inside routes.
- Preserve canonical URLs, the first project image as its social preview, and the shared fallback card.
- Keep `SITE_URL` in `shared` and derived from the built-in development/production mode.

## Verification and delivery

During TDD, run the focused test on every red and green cycle. Before handoff, run checks in proportion to risk. The complete gate is:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

Also verify the rendered UI when presentation or interaction changed. Inspect `git diff` and `git status` before reporting completion.

Keep generated output out of source control, including `.next`, `.output`, `.apphosting`, coverage, environment files, Firebase caches, and debug logs. Firebase App Hosting infers the Next.js build; add hosting configuration only for a demonstrated runtime requirement.

Phase branches merge into `feature/nextjs-migration`; the completed migration branch later merges into `latest`. Do not commit, push, create a pull request, or alter GitHub state unless the user requests it.

## Definition of done

A change is complete only when:

- the requested behavior is implemented as the smallest coherent vertical slice;
- every executable behavior was developed through an observed red → green cycle, or a documented validation-first exception was appropriate;
- focused tests and required quality checks pass;
- public seams are covered through behavior rather than implementation details;
- module ownership, dependency direction, exports, callers, fixtures, and documentation agree;
- `PRODUCT.md`, `CONTEXT.md`, `DESIGN.md`, the design sidecar, privacy copy, and module READMEs are updated wherever their source-of-truth contracts changed;
- accessibility, privacy, SEO, request sanitization, themes, responsive behavior, and reduced motion remain correct where relevant;
- the working tree contains no accidental generated output or unrelated cleanup.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
