# Projects module

Owns the portfolio project domain, project-index access, and browser Markdown loading.

## Interface

- `Project` is the single project data shape used throughout the application.
- `projectsService.getProjects()` returns the published index.
- `projectsService.getProject(id)` returns a published project and throws `RequestError` when unavailable.
- `projectsService.getProjectContent(project)` loads Markdown in the browser, removes YAML frontmatter, and throws `RequestError` when unavailable.

```ts
import { projectsService, type Project } from '@/modules/projects';
import { RequestError } from '@/modules/shared';
```

## Behavior

The private class keeps construction internal and exposes one shared `projectsService` instance. The first `getProjects()` call stores the result in a private static array; later calls in the same browser tab or server process reuse it. When a runtime starts without local state, the request also carries a 15-minute Next.js server revalidation window. Request failures throw the shared `RequestError`, whose `code` identifies the status and whose `message` explains the failure. The API base URL remains an implementation detail.

## Files

- `index.ts`: public singleton and type exports.
- `config/constants.ts`: published API location; only the service imports it.
- `services/projects.service.ts`: the private class, exported singleton, cached metadata access, and Markdown loading.
- `services/projects.service.test.ts`: interface-level tests with mocked network responses.
- `types/project.type.ts`: project domain model.
