# Work module

Owns client-side project search, pagination, and project-card presentation for the home route.

## Interface

```tsx
import { WorkSection } from '@/modules/work';

<WorkSection projects={projects} />;
```

Projects are supplied by the server route. The module does not read project data from global application state.

## Files

- `index.ts`: public module export.
- `components/work/index.ts`: work-section export.
- `components/work/work.component.tsx`: interactive search, filtering, and pagination state.
- `components/work/work.styles.scss`: work-section layout, results, empty-state, and pagination styles.
- `components/work/work.test.tsx`: work-section behavior tests.
- `components/project-card/index.ts`: internal project-card export.
- `components/project-card/project-card.component.tsx`: project summary and internal navigation link.
- `components/project-card/project-card.styles.scss`: styles scoped to the project-card structure.
- `components/project-card/project-card.test.tsx`: image and fallback-artwork tests.
- `components/search-bar/index.ts`: internal search-input export.
- `components/search-bar/search-bar.component.tsx`: accessible controlled search field.
- `components/search-bar/search-bar.styles.scss`: styles scoped to the search field structure.
- `components/search-bar/search-bar.test.tsx`: search-input behavior tests.
- `utils/filter-projects.function.ts`: case-insensitive project filtering.
- `utils/filter-projects.test.ts`: filtering tests.
