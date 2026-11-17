# Testing

Vitest and Testing Library cover module interfaces, interactive behavior, and service boundaries.

## Structure

- `index.tsx`: shared Testing Library exports and application-aware `render` helper.
- `fixtures/app-state.fixture.ts`: default theme and project state for client components.
- `fixtures/projects.fixture.ts`: reusable project data.
- `fixtures/theme.fixture.ts`: reusable theme value.
- `app/api/*`: Next.js route-handler tests kept outside the route tree.
- `app/project/*`: Next.js page and metadata tests kept outside the route tree.

Module tests live beside the implementation they verify. App Router tests live under `tests/app` so `app` contains only framework route files. Use fixtures instead of inline mock application state, mock network boundaries in service tests, and prefer accessible queries such as roles and labels.

## Commands

```bash
npm test
npm run typecheck
```
