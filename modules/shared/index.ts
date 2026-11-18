/** Shared layout and navigation components. */
export { Container, type ContainerProps } from './components/container';
export { ErrorBoundary } from './components/error-boundary';
export { Footer } from './components/footer';
export { GlobalError } from './components/global-error';
export { Navigation } from './components/navigation';

/** Public asset API location. */
export { API_URL, SITE_URL } from './config/constants';

/** Shared request error used by service boundaries. */
export { RequestError } from './errors/request.error';

/** Shared client state for the theme and project drawer. */
export {
  AppStateProvider,
  type StateProviderProps,
  useAppState,
} from './providers/app-state/app-state.provider';
