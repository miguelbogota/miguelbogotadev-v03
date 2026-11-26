'use client';

import { useEffect, useState } from 'react';

import { analyticsService } from '@/modules/analytics';
import { RequestError } from '@/modules/shared';

import { projectClient } from '../../services/project.client';
import { type Project, type ProjectContent } from '../../types/project.type';

/** Progressive project-content state exposed to presentation components. */
export type ProjectContentState = {
  content: ProjectContent | null;
  contentError: RequestError | null;
  isLoadingContent: boolean;
};

/**
 * Loads progressive project content and cancels stale requests when the project changes.
 *
 * @example
 * ```tsx
 * const { content, contentError, isLoadingContent } = useProjectContent(project);
 * ```
 *
 * @param project - Project reference containing the published content identifier.
 * @returns The current loading, content, and sanitized error state.
 */
export function useProjectContent(project: Pick<Project, 'id'>): ProjectContentState {
  const { id } = project;
  const [content, setContent] = useState<ProjectContent | null>(null);
  const [contentError, setContentError] = useState<RequestError | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setContent(null);
    setContentError(null);
    setIsLoadingContent(true);

    projectClient
      .getContent({ id }, { signal: controller.signal })
      .then(setContent)
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setContentError(
          error instanceof RequestError
            ? error
            : new RequestError({ code: 500, message: 'Project details could not be loaded.' }),
        );
        analyticsService.trackException('project_content');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingContent(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  return { content, contentError, isLoadingContent };
}
