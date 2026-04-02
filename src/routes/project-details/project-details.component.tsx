import { ProjectInfo } from '@/components/project-info';

/** Project details route props. */
export type ProjectDetailsRouteProps = {
  project: Project;
};

/** Project details route component. */
export function ProjectDetailsRoute({ project }: ProjectDetailsRouteProps) {
  return <ProjectInfo project={project} backButton={<a href="/">Back</a>} />;
}
