import './not-found.styles.scss';

import Link from 'next/link';

import { Container } from '../container';

/**
 * NotFound component.
 * Displays a minimalistic 404 error page.
 * Features a large "404" title, descriptive message, and a go back button.
 */
export function NotFound() {
  return (
    <Container className="not-found">
      <div>
        <h1>404</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" scroll={false}>
          Go Home
        </Link>
      </div>
    </Container>
  );
}
