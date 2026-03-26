import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    include: ['**/*.test.ts', '**/*.test.tsx'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
});

export default config;
