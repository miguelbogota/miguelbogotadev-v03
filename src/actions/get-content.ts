import type { Content } from '@/types/content';
import { API_URL } from './constants';

let cachedContent: Content | null = {
  logoName: 'MIGUEL BOGOTA',
  links: [
    { id: 'profile', label: 'PROFILE' },
    { id: 'works', label: 'WORK' },
    { id: 'social', label: 'SOCIAL' },
  ],
  externalLink: {
    href: 'https://youtu.be',
    label: 'RESUME',
  },
  footer: 'Designed & Built by Miguel Bogota',
};

/**
 * Fetches the content data from the Github repository. This ensures that the data is always
 * up-to-date with the latest changes in the repository, without needing to redeploy the
 * application.
 */
export async function getContent() {
  if (cachedContent) {
    console.log('❤️ Returning cached content...');
    return cachedContent;
  }

  console.log('😭 Fetching content from API...');

  const response = await fetch(`${API_URL}/content/v03.json`);
  const data = (await response.json()) as Content;
  cachedContent = data;

  return data;
}
