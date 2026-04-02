import { AppStateProvider, type InitialState } from './state';
import { HomeRoute } from '@/routes/home/home.component';
import { NotFoundRoute } from '@/routes/not-found/not-found.component';
import { ProjectDetailsRoute } from '@/routes/project-details/project-details.component';
import { useEffect, type PropsWithChildren } from 'react';
import { useDrawerRouting } from './components/drawer/use-drawer-routing';

/** Props for the Router component. */
export type RouterProps = InitialState;

/** Component contains all of the initial effects for the page. */
function Effects({ children }: PropsWithChildren) {
  useDrawerRouting();

  /**
   * Fixes the issue where the buttons are not clickable on mobile devices by adding a
   * touchstart listener that triggers a click event.
   */
  useEffect(() => {
    function handleTouchStart(this: Document, event: TouchEvent) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        try {
          event.preventDefault();
          target.click();
        } catch (er) {}
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return children;
}

/** Router component for the application. */
export function Router(props: RouterProps) {
  const { url, projects } = props;

  const projectId = url.split('/').pop();

  const withStateProvider = (route: React.ReactNode) => (
    <AppStateProvider value={props}>
      <Effects>{route}</Effects>
    </AppStateProvider>
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
