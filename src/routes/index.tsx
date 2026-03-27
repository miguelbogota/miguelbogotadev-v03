import { Container } from '@/components/container';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context }) => context,
});

function App() {
  const { projects } = Route.useLoaderData();

  return (
    <main>
      <Container>
        <section id="profile" style={{ minHeight: '100vh' }}>
          <h2>Profile</h2>
        </section>

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

        <section id="social" style={{ minHeight: '100vh' }}>
          <h2>Social</h2>
        </section>
      </Container>
    </main>
  );
}
