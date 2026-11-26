import { cacheLife } from 'next/cache';

import { API_URL, RequestError } from '@/modules/shared';

import { type Project, type ProjectContent } from '../types/project.type';

/** Provides server-only access to the published project index. */
class ProjectService {
  /**
   * Fetches the published project index.
   * Callers should normally use `getCachedProjects` so Next.js owns freshness.
   *
   * @returns The published projects.
   * @throws {RequestError} When the project index cannot be loaded.
   */
  async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_URL}/index.json`);

      if (!response.ok) {
        throw new RequestError({
          code: response.status,
          message: `The projects API request failed with status ${response.status}.`,
        });
      }

      return (await response.json()) as Project[];
    } catch (error) {
      if (error instanceof RequestError) {
        throw error;
      }

      throw new RequestError({
        code: 500,
        message: 'The projects API request could not be completed.',
      });
    }
  }

  /**
   * Preloads a project overview and all initiative Markdown documents.
   *
   * @param project - Project reference containing its identifier and initiatives.
   * @returns The complete long-form project content bundle.
   * @throws {RequestError} When any required Markdown document cannot be loaded.
   */
  async getContent(
    project: Pick<Project, 'id' | 'contentLayout' | 'initiatives'>,
  ): Promise<ProjectContent> {
    const { id, contentLayout, initiatives } = project;
    const overviewPath = contentLayout === 'overview' ? [id, 'overview'] : [id];
    const markdownRequests = [
      this.getMarkdown({ projectId: id, contentPath: overviewPath }),
      ...initiatives.map((initiative) =>
        this.getMarkdown({ projectId: id, contentPath: [id, initiative.id] }),
      ),
    ];
    const [overview, ...initiativeMarkdown] = await Promise.all(markdownRequests);

    return {
      overview,
      initiatives: initiatives.map((initiative, index) => ({
        id: initiative.id,
        markdown: initiativeMarkdown[index] ?? '',
      })),
    };
  }

  /**
   * Fetches one published Markdown document and removes its YAML frontmatter.
   *
   * @param input - Project identity and relative published content path.
   * @returns Markdown without frontmatter.
   * @throws {RequestError} When the Markdown document cannot be loaded.
   */
  private async getMarkdown(input: { projectId: string; contentPath: string[] }): Promise<string> {
    const { projectId, contentPath } = input;

    try {
      const encodedPath = contentPath.map(encodeURIComponent).join('/');
      const response = await fetch(`${API_URL}/projects/${encodedPath}.md`);

      if (response.status === 404) {
        throw new RequestError({
          code: response.status,
          message: `Project content for "${projectId}" was not found.`,
        });
      }

      if (!response.ok) {
        throw new RequestError({
          code: response.status,
          message: `Project content for "${projectId}" failed with status ${response.status}.`,
        });
      }

      return this.removeFrontmatter(await response.text());
    } catch (error) {
      if (error instanceof RequestError) {
        throw error;
      }

      throw new RequestError({
        code: 500,
        message: `Project content for "${projectId}" could not be loaded.`,
      });
    }
  }

  /**
   * Removes one YAML frontmatter block from a Markdown document.
   *
   * @param markdown - Markdown returned by the upstream project endpoint.
   * @returns The trimmed Markdown body.
   */
  private removeFrontmatter(markdown: string): string {
    return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
  }
}

/** Shared server-side project service instance. */
export const projectService = new ProjectService();

/**
 * Returns the project index through the shared Next.js cache profile.
 *
 * @example
 * ```tsx
 * const projects = await getCachedProjects();
 * ```
 *
 * @returns The cached published projects.
 */
export async function getCachedProjects(): Promise<Project[]> {
  'use cache';
  // Keep the cache configuration adjacent to the Next.js function directive.
  // eslint-disable-next-line @stylistic/padding-line-between-statements
  cacheLife('projects');

  return projectService.getProjects();
}

/**
 * Finds one project in the shared cached index.
 * The lookup stays outside the cache boundary so `RequestError` keeps its class identity.
 *
 * @example
 * ```tsx
 * const project = await getCachedProject('portfolio-project');
 * ```
 *
 * @param projectId - Published project identifier.
 * @returns The matching project metadata.
 * @throws {RequestError} When the identifier is not found.
 */
export async function getCachedProject(projectId: string): Promise<Project> {
  const projects = await getCachedProjects();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    throw new RequestError({
      code: 404,
      message: `Project "${projectId}" was not found.`,
    });
  }

  return project;
}
