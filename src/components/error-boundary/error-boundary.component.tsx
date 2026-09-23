import { Component, type PropsWithChildren, type Dispatch } from 'react';

/**
 * Generic error boundary. Calls its `set` prop on error.
 */
export class ErrorBoundary extends Component<
  PropsWithChildren<{ set?: Dispatch<any> }>,
  { error: boolean }
> {
  override state = { error: false };

  static getDerivedStateFromError = () => ({ error: true });

  override componentDidCatch(error: any) {
    this.props.set?.(error);
  }

  override render() {
    return this.state.error ? null : this.props.children;
  }
}
