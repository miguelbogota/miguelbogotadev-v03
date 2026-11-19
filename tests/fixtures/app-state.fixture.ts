import { projectsFixture } from './projects.fixture';
import { themeFixture } from './theme.fixture';

/**
 * Default application state supplied by the shared component test renderer.
 *
 * @example
 * ```tsx
 * import { appStateFixture, render } from '@/testing';
 * import { AppStateProvider, Navigation } from '@/modules/shared';
 *
 * render(
 *   <AppStateProvider value={appStateFixture}>
 *     <Navigation />
 *   </AppStateProvider>,
 * );
 * ```
 */
export const appStateFixture = {
  theme: themeFixture,
  projects: projectsFixture,
};
