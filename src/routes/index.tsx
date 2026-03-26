import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context }) => context,
});

function App() {
  const { content, projects } = Route.useLoaderData();

  return (
    <main>
      {JSON.stringify(content)}

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
    </main>
  );
}
