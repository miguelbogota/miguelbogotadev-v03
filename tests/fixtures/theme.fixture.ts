import type { Theme } from '@/modules/theme';

/**
 * Default theme used by component tests.
 *
 * @example
 * ```tsx
 * import { themeFixture } from '@/testing';
 *
 * document.documentElement.dataset.theme = themeFixture;
 * ```
 */
export const themeFixture: Theme = 'system';
