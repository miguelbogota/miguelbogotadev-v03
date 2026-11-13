import Link from 'next/link';

import { ProjectInfo } from '@/components/project-info';
import { type Project } from '@/modules/projects';

/** Project details route props. */
export type ProjectDetailsRouteProps = {
  project: Project;
};

/** Project details route component. */
export function ProjectDetailsRoute({ project }: ProjectDetailsRouteProps) {
  return (
    <ProjectInfo
      project={project}
      backButton={
        <Link href="/">
          <span>⬅</span>
          <span>Back</span>
        </Link>
      }
    />
  );
}
