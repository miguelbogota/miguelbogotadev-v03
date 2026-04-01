import { type Project } from '../types/project';
import { API_URL } from './constants';

let cachedProjects: Project[] = [];

/**
 * Fetches the list of projects from the Github repository. This ensures that the data is always
 * up-to-date with the latest changes in the repository, without needing to redeploy the
 * application.
 */
export async function getProjects() {
  if (cachedProjects.length > 0) {
    console.log('❤️ Returning cached projects...');
    return cachedProjects;
  }

  console.log('😭 Fetching projects from API...');

  const response = await fetch(`${API_URL}/index.json`);
  const data = (await response.json()) as Project[];
  cachedProjects = data;

  return cachedProjects;
}
