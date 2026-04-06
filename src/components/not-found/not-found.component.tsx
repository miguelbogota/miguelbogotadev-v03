import './not-found.styles.scss';

import { Container } from '@/components/container';
import { useAppState } from '@/state';

/**
 * NotFound component.
 * Displays a minimalistic 404 error page with dynamic content from the API.
 * Features a large "404" title, descriptive message, and a go back button.
 * All text content is sourced from the content API to ensure consistency.
 */
export function NotFound() {
  const { content } = useAppState();

  return (
    <Container className="not-found">
      <div>
        <h1>{content.notFound.title}</h1>
        <p>{content.notFound.description}</p>
        <a href="/">{content.notFound.goHomeButton}</a>
      </div>
    </Container>
  );
}
