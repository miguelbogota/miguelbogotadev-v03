import { type MetadataRoute } from 'next';

import { getCachedProjects } from '@/modules/project/services/project.service';
import { seoService } from '@/modules/seo';

/** Builds sitemap entries from the same cached project index used by project routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getCachedProjects();

  return seoService.getSitemap(projects);
}
