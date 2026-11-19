/** Base URL for the GitHub API to fetch project data. */
export const API_URL = 'https://miguelbogota.github.io/miguelbogotadev-api';

/** Portfolio origin selected from Next.js's built-in development or production mode. */
export const SITE_URL =
  process.env.NODE_ENV === 'production' ? 'https://miguelbogota.dev' : 'http://localhost:3000';
