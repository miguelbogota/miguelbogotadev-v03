import { Component, type Dispatch, type PropsWithChildren } from 'react';

/**
 * Generic error boundary. Calls its `set` prop on error.
 */
export class ErrorBoundary extends Component<
  PropsWithChildren<{ set?: Dispatch<unknown> }>,
  { error: boolean }
> {
  override state = { error: false };

  static getDerivedStateFromError = () => ({ error: true });

  override componentDidCatch(error: unknown) {
    this.props.set?.(error);
  }

  override render() {
    return this.state.error ? null : this.props.children;
  }
}
