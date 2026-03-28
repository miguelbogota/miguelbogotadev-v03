import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { Profile } from '@/sections/profile';
import { Social } from '@/sections/social';
import { createFileRoute, Link } from '@tanstack/react-router';

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

          <section id="works" style={{ minHeight: '100vh' }}>
            <h2>Works</h2>
            <div>
              {projects.map((project) => (
                <div key={project.id}>
                  <h2>{project.displayName}</h2>
                  <p>{project.description}</p>
                  <p>{project.startedAt}</p>

                  <Link to="/project/$projectId" params={{ projectId: project.id }}>
                    View Project
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <Social {...content.social} />
        </Container>
      </main>

      <Footer {...content.footer} />
    </>
  );
}
