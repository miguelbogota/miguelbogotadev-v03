# SEO module

Owns canonical URLs and shared search/social metadata. Route files stay responsible for Next.js conventions while `seoService` keeps home, privacy, and project metadata consistent.

## Public API

```ts
import { SITE_URL, seoService } from '@/modules/seo';
```

## Files

- `index.ts`: public constants and service exports.
- `config/constants.ts`: canonical origin, site copy, and fallback social image path.
- `services/seo.service.ts`: builds root, privacy, project, manifest, robots, and sitemap metadata.
- `services/seo.service.test.ts`: metadata-route, canonical URL, sitemap, and image fallback coverage.

Project metadata uses the first valid HTTP(S) image. Projects without valid artwork use `public/images/social-card.png`, which is intentionally 1200×630 for Open Graph previews.
