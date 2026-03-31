import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { Profile } from '@/sections/profile';
import { Social } from '@/sections/social';
import { Work } from '@/sections/work';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context }) => context,
});

function App() {
  const { content, projects } = Route.useLoaderData();

  return (
    <>
      <Navigation {...content.navigation} />

      <main>
        <Container>
          <Profile {...content.profile} />
          <Work {...content.work} projects={projects} />
          <Social {...content.social} />
        </Container>
      </main>

      <Footer {...content.footer} />
    </>
  );
}
