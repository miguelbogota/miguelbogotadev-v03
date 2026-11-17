import { type MetadataRoute } from 'next';

import { seoService } from '@/modules/seo';

/** Allows public crawling and publishes the canonical sitemap location. */
export default function robots(): MetadataRoute.Robots {
  return seoService.getRobots();
}
