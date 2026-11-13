import { projectsFixture } from './projects.fixture';
import { themeFixture } from './theme.fixture';

/**
 * Default application state supplied by the shared component test renderer.
 *
 * @example
 * ```tsx
 * import { appStateFixture, render } from '@/testing';
 * import { AppStateProvider } from '@/state';
 * import { Navigation } from '@/components/navigation';
 *
 * render(
 *   <AppStateProvider value={appStateFixture}>
 *     <Navigation />
 *   </AppStateProvider>,
 * );
 * ```
 */
export const appStateFixture: Window['__STATE__'] = {
  url: 'http://localhost:3000/',
  theme: themeFixture,
  projects: projectsFixture,
};
