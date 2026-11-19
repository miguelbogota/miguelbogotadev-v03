import { ErrorPage } from '@/modules/shared';

/** Renders the project-specific missing route state. */
export default function ProjectNotFound() {
  return (
    <ErrorPage
      title="Project not found"
      message="The requested project is not published or may have moved."
    />
  );
}
