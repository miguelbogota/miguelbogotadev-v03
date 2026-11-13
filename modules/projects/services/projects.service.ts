import { RequestError } from '@/modules/shared';

import { PROJECTS_API_BASE_URL } from '../config/constants';
import { type Project } from '../types/project.type';

/**
 * Provides project metadata and Markdown through one shared module instance.
 * The class keeps fetched metadata in memory for the lifetime of the current runtime.
 */
class ProjectsService {
  /** Project metadata cached for the lifetime of the browser tab or server process. */
  private static projects: Project[] = [];

  /**
   * Returns the in-memory project list or fetches the published index when the list is empty.
   * A server fetch requests a 15-minute Next.js revalidation window.
   *
   * @returns The published projects.
   * @throws {RequestError} When the project index cannot be loaded.
   */
  async getProjects(): Promise<Project[]> {
    if (ProjectsService.projects.length > 0) {
      return ProjectsService.projects;
    }

    try {
      const response = await fetch(`${PROJECTS_API_BASE_URL}/index.json`, {
        next: { revalidate: 15 * 60 },
      });

      if (!response.ok) {
        throw new RequestError({
          code: response.status,
          message: `The projects API request failed with status ${response.status}.`,
        });
      }

      ProjectsService.projects = (await response.json()) as Project[];
      return ProjectsService.projects;
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
   * Finds a project in the published project index.
   *
   * @param id - The project identifier to find.
   * @returns The matching project.
   * @throws {RequestError} When the project index cannot load or the identifier is not published.
   */
  async getProject(id: string): Promise<Project> {
    const projects = await this.getProjects();

    const project = projects.find((item) => item.id === id);

    if (!project) {
      throw new RequestError({
        code: 404,
        message: `Project "${id}" was not found.`,
      });
    }

    return project;
  }

  /**
   * Loads the Markdown document for a project and removes its YAML frontmatter.
   *
   * @param project - A project reference that contains the identifier used in the Markdown URL.
   * @returns The Markdown body.
   * @throws {RequestError} When the Markdown document cannot be loaded.
   */
  async getProjectContent(project: Pick<Project, 'id'>): Promise<string> {
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
   * Clears project metadata cached by this service instance.
   * This internal test seam must not be used by application code.
   *
   * @internal
   */
  _clearCache(): void {
    ProjectsService.projects = [];
  }

  /**
   * Removes one YAML frontmatter block from the start of a Markdown document.
   *
   * @param markdown - The Markdown document returned by the project data source.
   * @returns The trimmed Markdown body.
   */
  private removeFrontmatter(markdown: string): string {
    return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
  }
}

/**
 * Shared project module instance used by server routes and client project details.
 *
 * @example
 * ```tsx
 * import { projectsService } from '@/modules/projects';
 *
 * const project = await projectsService.getProject('portfolio-project');
 * console.log(project.displayName);
 * ```
 */
export const projectsService = new ProjectsService();
