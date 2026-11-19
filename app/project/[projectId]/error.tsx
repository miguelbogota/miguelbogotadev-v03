'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/modules/shared';

/** Props supplied by the App Router project error boundary. */
type ProjectRouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Handles unexpected project-route failures and offers an in-place retry.
 *
 * @param props - Captured error and boundary reset callback.
 * @returns The project route recovery UI.
 */
export default function ProjectRouteError(props: ProjectRouteErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    console.error('Project route failed.', { digest: error.digest });
  }, [error.digest]);

  return (
    <ErrorPage
      title="This project could not be loaded"
      message="Something went wrong while loading the project. Please try again."
      action={<button onClick={reset}>Try again</button>}
    />
  );
}
