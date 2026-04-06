import { useAppState } from '@/state';
import { ProjectInfo } from '@/components/project-info';

/** Project details route props. */
export type ProjectDetailsRouteProps = {
  project: Project;
};

/** Project details route component. */
export function ProjectDetailsRoute({ project }: ProjectDetailsRouteProps) {
  const { content } = useAppState();

  return (
    <ProjectInfo
      project={project}
      backButton={
        <a href="/">
          <span>⬅</span>
          <span>{content.projectDetails.backButton}</span>
        </a>
      }
    />
  );
}
