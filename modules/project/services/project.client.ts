'use client';

import { RequestError } from '@/modules/shared';

import { type Project } from '../types/project.type';

/** Loads progressive project content through the internal application API. */
class ProjectClient {
  /**
   * Loads project Markdown through the internal application API.
   *
   * @param project - Project reference containing the Markdown identifier.
   * @returns The Markdown body.
   * @throws {RequestError} When the Markdown document cannot be loaded.
   */
  async getContent(project: Pick<Project, 'id'>): Promise<string> {
    try {
      const projectId = encodeURIComponent(project.id);
      const response = await fetch(`/api/project/${projectId}/content`);

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

      return response.text();
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
}

/** Shared browser project-content client. */
export const projectClient = new ProjectClient();
