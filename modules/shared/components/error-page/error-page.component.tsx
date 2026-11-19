import './error-page.styles.scss';

import Link from 'next/link';
import { type ReactNode } from 'react';

import { Container } from '../container';

/** Props for the shared full-page error presentation. */
export type ErrorPageProps = {
  title: string;
  message: string;
  action?: ReactNode;
};

/**
 * Renders an accessible error page with recovery actions.
 *
 * @example
 * ```tsx
 * <ErrorPage title="Page not found" message="The page may have moved." />
 * ```
 *
 * @param props - Error copy and an optional primary recovery action.
 * @returns The shared full-page error presentation.
 */
export function ErrorPage(props: ErrorPageProps) {
  const { title, message, action } = props;

  return (
    <main className="error-page">
      <Container maxWidth="970px">
        <section aria-labelledby="error-page-title">
          <h1 id="error-page-title">{title}</h1>
          <p>{message}</p>
          <div>
            {action}
            <Link href="/" scroll={false}>
              Return to the portfolio
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
