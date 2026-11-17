import { type MetadataRoute } from 'next';

import { seoService } from '@/modules/seo';

/** Returns the installable portfolio manifest through Next.js metadata routing. */
export default function manifest(): MetadataRoute.Manifest {
  return seoService.getManifest();
}
