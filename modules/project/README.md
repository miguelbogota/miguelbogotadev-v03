# Project module

Owns the portfolio project domain, project-index access, and browser Markdown loading.

## Interface

- `Project` is the single project data shape used throughout the application.
- `thumbnail` is the required 3:2 project-card image and `artwork` is the required 1200:630 details and social image.
- `initiatives` contains metadata previews for focused case studies within one professional experience.
- `getCachedProjects()` returns the published index through the named Next.js cache profile.
- `getCachedProject(id)` returns one cached project and throws `RequestError` when it is not published.
- `projectClient.getContent(project)` loads one sanitized overview-and-initiatives bundle through the internal browser API.

```ts
import { projectClient } from '@/modules/project/services/project.client';
import { getCachedProject } from '@/modules/project/services/project.service';
```

## Behavior

Server project-index access and browser Markdown loading use separate boundaries. `projectService` performs upstream requests, while `getCachedProjects()` owns the 15-minute Next.js cache profile and is shared by the home and canonical project routes. `projectClient` is marked as client code and requests content only through `app/api/project/[projectId]/content`. The internal route resolves project metadata, loads the overview and every initiative concurrently, sanitizes failures, and keeps upstream content URLs out of the browser bundle. Request failures use the shared `RequestError`; the upstream API base URL remains a server implementation detail.

## Files

- `index.ts`: public drawer, project presentation, and project type exports.
- `components/drawer/*`: client drawer and browser-history navigation retained after the intercepted-route experiment was removed.
- `components/initiative-accordion/*`: accessible single-open disclosure list for fully loaded initiative case studies.
- `components/project-info/*`: shared drawer and canonical-route project presentation.
- `components/project-markdown/*`: safe shared Markdown rendering and inline image defaults.
- `services/project.client.ts`: browser-only access to the internal project-content API.
- `services/project.client.test.ts`: client request and failure-mapping tests.
- `services/project.service.ts`: server project-index instance and shared cached lookup functions.
- `services/project.service.test.ts`: server request, cache-profile, and lookup tests.
- `types/project.type.ts`: published project metadata contract.

The server service reuses the shared `API_URL`; the client never imports or receives that upstream location.

## Canonical route

`app/project/[projectId]` generates paths for the current project index. Cache Components reject the legacy `dynamicParams` route export and support runtime parameters implicitly, so projects published after deployment render on their first request and enter the runtime cache. The route shell and metadata use cached project metadata; long-form Markdown remains a client-only progressive region with its existing skeleton and failure states.

Raw HTML is not enabled in `react-markdown`; project and initiative content can use standard Markdown but cannot inject arbitrary HTML into the page. Supporting case-study images are authored inline in Markdown, reserve space with shared dimensions, and render within a centered 760px reading measure. Switching directly between expanded initiatives scrolls the newly opened heading into reading position after the previous panel collapses.

The internal project-content API is a backend-for-frontend boundary, not a secret URL. Browser users can see the local `/api/project/...` request, but they do not receive the upstream host, path structure, or upstream failure details from the client implementation.

The drawer makes ordinary page siblings inert while open. Higher transient overlays marked with `data-inert-exempt`, such as the analytics notice, remain operable and join the drawer's keyboard focus loop.

Project metadata is built by the `seo` module. It uses canonical project URLs and the required project artwork. The same artwork appears as the banner above project details; inline Markdown images are supporting evidence rather than social metadata.
