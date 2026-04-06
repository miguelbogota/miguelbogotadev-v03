import { defineConfig } from 'vitest/config';

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['**/*.test.ts', '**/*.test.tsx'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
});

export default config;
