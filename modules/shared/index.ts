/** Shared layout and navigation components. */
export { Container, type ContainerProps } from './components/container';
export { ErrorBoundary } from './components/error-boundary';
export { Footer } from './components/footer';
export { Navigation } from './components/navigation';
export { NotFound } from './components/not-found';

/** Public asset API location. */
export { API_URL } from './config/constants';

/** Shared request error used by service boundaries. */
export { RequestError } from './errors/request.error';

/** Shared client state used until App Router drawer routing replaces it in Phase 5. */
export {
  AppStateProvider,
  type InitialState,
  type StateContext,
  type StateProviderProps,
  useAppState,
  type VirtualStateContext,
} from './providers/app-state/app-state.provider';
