import { Container } from '@/components/container';
import { Navigation } from '@/components/navigation';

/** Home route component. */
export function HomeRoute() {
  return (
    <>
      <Navigation />

      <Container as="main">Hello World</Container>
    </>
  );
}
