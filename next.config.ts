import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  cacheLife: {
    projects: {
      stale: 5 * 60,
      revalidate: 15 * 60,
      expire: 24 * 60 * 60,
    },
  },
};

export default nextConfig;
