import { ProjectError } from '@/modules/project';

/** Renders the project-specific missing route state. */
export default function ProjectNotFound() {
  return (
    <ProjectError
      title="Project not found"
      message="The requested project is not published or may have moved."
    />
  );
}
