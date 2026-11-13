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
   * @returns The projects published by the portfolio data source.
   */
  async getProjects(): Promise<Project[]> {
    if (ProjectsService.projects.length > 0) {
      return ProjectsService.projects;
    }

    const response = await fetch(`${PROJECTS_API_BASE_URL}/index.json`, {
      next: { revalidate: 15 * 60 },
    });

    if (!response.ok) {
      throw new Error(`The projects API request failed with status ${response.status}.`);
    }

    ProjectsService.projects = (await response.json()) as Project[];
    return ProjectsService.projects;
  }

  /**
   * Finds a project in the published project index.
   *
   * @param id - The project identifier to find.
   * @returns The matching project, or `null` when the index does not contain the identifier.
   */
  async getProject(id: string): Promise<Project | null> {
    const projects = await this.getProjects();

    return projects.find((project) => project.id === id) ?? null;
  }

  /**
   * Loads the Markdown document for a project and removes its YAML frontmatter.
   *
   * @param project - A project reference that contains the identifier used in the Markdown URL.
   * @returns The Markdown body, or `null` when the document cannot be loaded.
   */
  async getProjectContent(project: Pick<Project, 'id'>): Promise<string | null> {
    try {
      const projectId = encodeURIComponent(project.id);
      const response = await fetch(`${PROJECTS_API_BASE_URL}/projects/${projectId}.md`);

      if (!response.ok) {
        return null;
      }

      return this.removeFrontmatter(await response.text());
    } catch {
      return null;
    }
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
 * ```
 */
export const projectsService = new ProjectsService();
