/** Base URL for the GitHub API to fetch project data. */
export const API_URL = 'http://127.0.0.1:4173';

/** Human-readable portfolio name shared by document and social metadata. */
export const SITE_NAME = 'Miguel Bogota';

/** Portfolio origin selected from Next.js's built-in development or production mode. */
export const SITE_URL =
  process.env.NODE_ENV === 'production' ? 'https://miguelbogota.dev' : 'http://localhost:3000';
