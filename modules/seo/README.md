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

Project metadata uses the first image in the published project data. Its portrait-friendly `summary` card keeps the original artwork URL without generating another asset or image service. Projects without artwork use `public/images/social-card.png` and a `summary_large_image` card; the fallback is intentionally 1200×630 for wide previews.

The shared module owns `SITE_URL`: `http://localhost:3000` in Next.js development/test mode and `https://miguelbogota.dev` in production.
