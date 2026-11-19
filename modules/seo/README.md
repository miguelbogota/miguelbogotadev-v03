# SEO module

Owns canonical URLs and shared search/social metadata. Route files stay responsible for Next.js conventions while `seoService` keeps home, privacy, and project metadata consistent.

## Public API

```ts
import { seoService } from '@/modules/seo';
```

## Files

- `index.ts`: public service export.
- `config/constants.ts`: site copy and fallback social image path.
- `services/seo.service.ts`: builds root, privacy, project, manifest, robots, and sitemap metadata.
- `services/seo.service.test.ts`: metadata-route, canonical URL, sitemap, and image fallback coverage.

Project metadata uses the required `artwork` in the published project data with a `summary_large_image` card. The same asset appears as the project-details banner, so projects own one wide visual identity without another generated asset or image service. Home and privacy metadata continue using the shared 1200×630 fallback card.

The shared module owns `SITE_URL`: `http://localhost:3000` in Next.js development/test mode and `https://miguelbogota.dev` in production.
