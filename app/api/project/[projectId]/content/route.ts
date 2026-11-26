import {
  getCachedProject,
  projectService,
} from '@/modules/project/services/project.service';
import { RequestError } from '@/modules/shared';

/** Route context containing the requested project identifier. */
type ProjectContentRouteContext = {
  params: Promise<{ projectId: string }>;
};

/**
 * Proxies the complete project content bundle without exposing upstream endpoints.
 *
 * @param request - Incoming internal API request.
 * @param context - Route parameters supplied by Next.js.
 * @returns The preloaded project-content bundle or a sanitized JSON failure.
 */
export async function GET(
  request: Request,
  context: ProjectContentRouteContext,
): Promise<Response> {
  void request;

  const { params } = context;
  const { projectId } = await params;

  try {
    const project = await getCachedProject(projectId);
    const content = await projectService.getContent(project);

    return Response.json(content);
  } catch (error) {
    const code = error instanceof RequestError ? error.code : 500;
    const message =
      code === 404 ? 'Project content was not found.' : 'Project content is unavailable.';

    return Response.json({ message }, { status: code });
  }
}
