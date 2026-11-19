# Testing

Vitest and Testing Library cover module interfaces, interactive behavior, and service boundaries.

## Structure

- `index.tsx`: shared Testing Library exports and application-aware `render` helper.
- `fixtures/app-state.fixture.ts`: default theme and project state for client components.
- `fixtures/projects.fixture.ts`: reusable project data.
- `fixtures/theme.fixture.ts`: reusable theme value.

Tests live beside the module implementation they verify. The `app` directory stays limited to thin Next.js routing files, while route-independent behavior is tested through its owning module. Use fixtures instead of inline mock application state, mock network boundaries in service tests, and prefer accessible queries such as roles and labels.

Do not add tests for thin pages, layouts, or metadata route wrappers. Move meaningful logic into its owning module and test it there.

## Commands

```bash
npm test
npm run typecheck
```
