import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { AppStateProvider, type StateProviderProps } from '@/state';
import { mockState } from './mock-state';

/** Custom render function that wraps the component with all the app providers. */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    state?: Partial<StateProviderProps['value']>;
  },
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AppStateProvider value={{ ...mockState, ...options?.state }}>{children}</AppStateProvider>
    ),
    ...options,
  });

// Re-export everything from the testing library
export * from '@testing-library/react';

// Override the original render method
export { customRender as render };
