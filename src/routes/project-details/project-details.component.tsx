/** Project details route props. */
export type ProjectDetailsRouteProps = {
  project: Project;
};

/** Project details route component. */
export function ProjectDetailsRoute({ project }: ProjectDetailsRouteProps) {
  return <div>Project Details: {project?.id}</div>;
}
