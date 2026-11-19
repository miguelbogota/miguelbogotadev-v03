'use client';

import './global-error.styles.scss';

import { useEffect } from 'react';

import { analyticsService } from '@/modules/analytics';

import { ErrorPage } from '../error-page';

/** Props supplied by Next.js when the root application boundary fails. */
export type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Renders a recoverable application failure without exposing raw error details. */
export function GlobalError(props: GlobalErrorProps) {
  const { reset } = props;

  useEffect(() => {
    analyticsService.trackException('application', true);
  }, []);

  return (
    <html lang="en">
      <body className="global-error">
        <ErrorPage
          title="The portfolio hit an unexpected problem"
          message="Something interrupted the page. Try again, or return to the portfolio."
          action={
            <button type="button" onClick={reset}>
              Try again
            </button>
          }
        />
      </body>
    </html>
  );
}
