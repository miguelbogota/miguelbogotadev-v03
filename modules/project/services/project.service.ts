import { cacheLife } from 'next/cache';

import { RequestError } from '@/modules/shared';

import { PROJECTS_API_BASE_URL } from '../config/constants';
import { type Project } from '../types/project.type';

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
      const response = await fetch(`${PROJECTS_API_BASE_URL}/index.json`);

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
   * Fetches a project Markdown document and removes its YAML frontmatter.
   *
   * @param project - Project reference containing the Markdown identifier.
   * @returns The Markdown body.
   * @throws {RequestError} When the Markdown document cannot be loaded.
   */
  async getContent(project: Pick<Project, 'id'>): Promise<string> {
    try {
      const projectId = encodeURIComponent(project.id);
      const response = await fetch(`${PROJECTS_API_BASE_URL}/projects/${projectId}.md`);

      if (response.status === 404) {
        throw new RequestError({
          code: response.status,
          message: `Project content for "${project.id}" was not found.`,
        });
      }

      if (!response.ok) {
        throw new RequestError({
          code: response.status,
          message: `Project content for "${project.id}" failed with status ${response.status}.`,
        });
      }

      return this.removeFrontmatter(await response.text());
    } catch (error) {
      if (error instanceof RequestError) {
        throw error;
      }

      throw new RequestError({
        code: 500,
        message: `Project content for "${project.id}" could not be loaded.`,
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
