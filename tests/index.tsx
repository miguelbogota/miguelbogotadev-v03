import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';

import { AppStateProvider, type StateProviderProps } from '@/state';

import { appStateFixture } from './fixtures/app-state.fixture';

/**
 * Renders a React element with the application state provider used in production.
 * Tests can replace individual state fields without constructing the complete state object.
 *
 * @example
 * ```tsx
 * import { render } from '@/testing';
 * import { Navigation } from '@/components/navigation';
 *
 * render(<Navigation />, { state: { theme: 'dark' } });
 * ```
 *
 * @param ui - The React element to render.
 * @param options - Testing Library options and optional application-state overrides.
 * @returns The Testing Library render result.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    state?: Partial<StateProviderProps['value']>;
  },
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AppStateProvider value={{ ...appStateFixture, ...options?.state }}>
        {children}
      </AppStateProvider>
    ),
    ...options,
  });

/** Testing Library exports used by repository tests. */
export * from '@testing-library/react';

/** Application-aware replacement for Testing Library's default `render` function. */
export { customRender as render };

/** Default application-state fixture. */
export { appStateFixture } from './fixtures/app-state.fixture';

/** Project fixtures used by module and component tests. */
export { projectFixture, projectsFixture } from './fixtures/projects.fixture';

/** Default theme fixture. */
export { themeFixture } from './fixtures/theme.fixture';
