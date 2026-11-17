import './project-error.styles.scss';

import Link from 'next/link';
import { type ReactNode } from 'react';

import { Container } from '@/modules/shared';

/** Props for a project route failure message. */
export type ProjectErrorProps = {
  title: string;
  message: string;
  action?: ReactNode;
};

/**
 * Renders a reusable project-route failure with a path back to the portfolio.
 *
 * @param props - Failure copy and an optional recovery action.
 * @returns The project error presentation.
 */
export function ProjectError(props: ProjectErrorProps) {
  const { title, message, action } = props;

  return (
    <main className="project-error">
      <Container maxWidth="720px">
        <p>Project unavailable</p>
        <h1>{title}</h1>
        <p>{message}</p>
        <div>
          {action}
          <Link href="/" scroll={false}>
            Return to the portfolio
          </Link>
        </div>
      </Container>
    </main>
  );
}
