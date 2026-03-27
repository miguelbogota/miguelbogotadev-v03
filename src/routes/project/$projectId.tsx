import { Container } from '@/components/container';
import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$projectId')({
  component: RouteComponent,
  loader: async ({ params: { projectId }, context }) => {
    const project = context.projects.find((p) => p.id === projectId);

    if (!project) {
      throw notFound({ data: projectId });
    }

    return { project, content: context.content };
  },
  notFoundComponent: ({ data }) => {
    return <div>Project {JSON.stringify(data)} not found.</div>;
  },
});

function RouteComponent() {
  const { project, content } = Route.useLoaderData();

  return (
    <Container>
      hello
      {JSON.stringify(content)}
      <div>Hello "/project/{project.id}"!</div>
      <h2>{project.displayName}</h2>
      <p>{project.description}</p>
      <p>{project.startedAt}</p>
    </Container>
  );
}
