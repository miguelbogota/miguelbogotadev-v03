import { projectService } from '@/modules/project/services/project.service';
import { RequestError } from '@/modules/shared';

/** Route context containing the requested project identifier. */
type ProjectContentRouteContext = {
  params: Promise<{ projectId: string }>;
};

/**
 * Proxies progressive project Markdown without exposing the upstream endpoint to the browser.
 *
 * @param request - Incoming internal API request.
 * @param context - Route parameters supplied by Next.js.
 * @returns Markdown content or a sanitized JSON failure.
 */
export async function GET(
  request: Request,
  context: ProjectContentRouteContext,
): Promise<Response> {
  void request;

  const { params } = context;
  const { projectId } = await params;

  try {
    const content = await projectService.getContent({ id: projectId });

    return new Response(content, {
      status: 200,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  } catch (error) {
    const code = error instanceof RequestError ? error.code : 500;
    const message =
      code === 404 ? 'Project content was not found.' : 'Project content is unavailable.';

    return Response.json({ message }, { status: code });
  }
}
