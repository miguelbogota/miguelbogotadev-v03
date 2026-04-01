import { AppStateProvider, type InitialState } from './state';
import { HomeRoute } from '@/routes/home/home.component';
import { NotFoundRoute } from '@/routes/not-found/not-found.component';
import { ProjectDetailsRoute } from '@/routes/project-details/project-details.component';

/** Props for the Router component. */
export type RouterProps = InitialState;

/** Router component for the application. */
export function Router(props: RouterProps) {
  const { url, projects } = props;

  const projectId = url.split('/').pop();

  const withStateProvider = (route: React.ReactNode) => (
    <AppStateProvider value={props}>{route}</AppStateProvider>
  );

  if (projectId) {
    const project = projects.find((p) => p.id === projectId);

    // Not found route.
    if (!project) return withStateProvider(<NotFoundRoute />);

    // Project details route.
    return withStateProvider(<ProjectDetailsRoute project={project} />);
  }

  // Home route.
  return withStateProvider(<HomeRoute />);
}
