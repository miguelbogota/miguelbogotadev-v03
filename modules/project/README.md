# Project module

Owns the portfolio project domain, project-index access, and browser Markdown loading.

## Interface

- `Project` is the single project data shape used throughout the application.
- `thumbnail` is the required 3:2 project-card image, `artwork` is the required 1200:630 details and social image, and `images` remains the gallery.
- `getCachedProjects()` returns the published index through the named Next.js cache profile.
- `getCachedProject(id)` returns one cached project and throws `RequestError` when it is not published.
- `projectClient.getContent(project)` loads sanitized Markdown through the internal browser API.

```ts
import { projectClient } from '@/modules/project/services/project.client';
import { getCachedProject } from '@/modules/project/services/project.service';
```

## Behavior

Server project-index access and browser Markdown loading use separate boundaries. `projectService` performs upstream requests, while `getCachedProjects()` owns the 15-minute Next.js cache profile and is shared by the home and canonical project routes. `projectClient` is marked as client code and requests Markdown only through `app/api/project/[projectId]/content`. The internal route sanitizes failures and keeps the upstream content URL out of the browser bundle. Request failures use the shared `RequestError`; the upstream API base URL remains a server implementation detail.

## Files

- `index.ts`: public drawer, project presentation, and project type exports.
- `components/drawer/*`: client drawer and browser-history navigation retained after the intercepted-route experiment was removed.
- `components/project-info/*`: shared drawer and canonical-route project presentation.
- `services/project.client.ts`: browser-only access to the internal project-content API.
- `services/project.client.test.ts`: client request and failure-mapping tests.
- `services/project.service.ts`: server project-index instance and shared cached lookup functions.
- `services/project.service.test.ts`: server request, cache-profile, and lookup tests.
- `types/project.type.ts`: published project metadata contract.

The server service reuses the shared `API_URL`; the client never imports or receives that upstream location.

## Canonical route

`app/project/[projectId]` generates paths for the current project index. Cache Components reject the legacy `dynamicParams` route export and support runtime parameters implicitly, so projects published after deployment render on their first request and enter the runtime cache. The route shell and metadata use cached project metadata; long-form Markdown remains a client-only progressive region with its existing skeleton and failure states.

Raw HTML is not enabled in `react-markdown`; project content can use standard Markdown but cannot inject arbitrary HTML into the page.

The internal project-content API is a backend-for-frontend boundary, not a secret URL. Browser users can see the local `/api/project/...` request, but they do not receive the upstream host, path structure, or upstream failure details from the client implementation.

Project metadata is built by the `seo` module. It uses canonical project URLs and the required project artwork. The same artwork appears as the banner above project details; gallery images remain independent.
