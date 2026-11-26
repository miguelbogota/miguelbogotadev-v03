'use client';

import './project-info.styles.scss';

import { useEffect, useState } from 'react';

import { analyticsService } from '@/modules/analytics';
import { seoService } from '@/modules/seo';
import { Container, Footer, RequestError, SITE_NAME } from '@/modules/shared';

import { projectClient } from '../../services/project.client';
import { type Project, type ProjectContent } from '../../types/project.type';
import { InitiativeAccordion } from '../initiative-accordion';
import { ProjectMarkdown } from '../project-markdown';

/** Ordered placeholder shapes representing a long project case study. */
const SKELETON_LINES = [
  'heading',
  'long',
  'medium',
  'long',
  'short',
  'media',
  'heading',
  'long',
  'long',
  'medium',
  'short',
  'heading',
  'long',
  'medium',
  'long',
  'short',
  'media',
  'long',
] as const;

/** Placeholder matching the shape of the Markdown content while it loads. */
function ProjectContentSkeleton() {
  return (
    <div
      className="content-skeleton"
      role="status"
      aria-label="Loading project details"
      aria-live="polite"
    >
      <div aria-hidden="true">
        {SKELETON_LINES.map((size, index) => (
          <span key={`${size}-${index}`} className={size} />
        ))}
      </div>
    </div>
  );
}

/** Props for the ProjectInfo component. */
export type ProjectInfoProps = {
  project: Project;
  backButton?: React.ReactNode;
  closeButton?: React.ReactNode;
  manageDocumentTitle?: boolean;
};

/**
 * ProjectInfo component.
 * Displays project metadata and renders its long-form Markdown content.
 * This component is designed to be reusable and can be used in both the drawer and standalone pages.
 *
 * @param props - Project metadata, optional actions, and title-management behavior.
 * @returns The progressive project details presentation.
 */
export function ProjectInfo(props: ProjectInfoProps) {
  const { project, backButton, closeButton, manageDocumentTitle = true } = props;
  const { id, displayName, summary, industry, startedAt, role, tags, artwork, links, initiatives } =
    project;
  const [content, setContent] = useState<ProjectContent | null>(null);
  const [contentError, setContentError] = useState<RequestError | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Set document title when component mounts and clean up on unmount.
  useEffect(() => {
    if (!manageDocumentTitle) {
      return undefined;
    }

    document.title = seoService.getProjectMetadata(project).title?.toString() ?? SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [project, manageDocumentTitle]);

  // Project metadata is rendered immediately; the long-form content is always loaded in-browser.
  useEffect(() => {
    let isCurrent = true;

    setContent(null);
    setContentError(null);
    setIsLoadingContent(true);

    projectClient
      .getContent({ id })
      .then((markdown) => {
        if (isCurrent) {
          setContent(markdown);
        }
      })
      .catch((error: unknown) => {
        if (!isCurrent) {
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
        if (isCurrent) {
          setIsLoadingContent(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  return (
    <div>
      {/* Action buttons container - only show if buttons are present */}
      <Container className="details-actions" maxWidth="50000px">
        <div className="action">{backButton}</div>
        <div className="action">{closeButton}</div>
      </Container>

      <Container className="project-info" maxWidth="1000px">
        {/* Project header */}
        <div className="header">
          <p>{startedAt}</p>
          <h1 id="drawer-title">{displayName}</h1>
          <span>{role}</span>
          {links && links.length > 0 && (
            <div className="links" aria-label={`${displayName} links`}>
              {links.map(({ url, label, icon }, index) => (
                <a
                  key={`${url}-${label}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${displayName}: ${label} (opens in a new tab)`}
                  title={`${label} (opens in a new tab)`}
                  onClick={() => analyticsService.trackLink('project', `resource-${index + 1}`)}
                >
                  <i className={icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Summary and tags wrapper */}
        <div className="summary-section">
          <p className="summary" id="drawer-description">
            {summary}
          </p>
          <div className="tags-section">
            <h3>{industry}</h3>
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={tag}>{`${tag}${index < tags.length - 1 ? ' • ' : ''}`}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="artwork">
          {/* Project media uses remote URLs that are not configured for Next image optimization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artwork.src} alt={artwork.alt} width={1200} height={630} fetchPriority="high" />
        </div>

        {isLoadingContent ? (
          <ProjectContentSkeleton />
        ) : content ? (
          <>
            <article>
              <ProjectMarkdown markdown={content.overview} />
            </article>
            <InitiativeAccordion initiatives={initiatives} content={content.initiatives} />
          </>
        ) : contentError?.code === 404 ? (
          <p className="content-status">Project details were not found.</p>
        ) : contentError ? (
          <p className="content-status">Project details are temporarily unavailable.</p>
        ) : (
          <p className="content-status">Project details are unavailable.</p>
        )}

      </Container>
      <Footer />
    </div>
  );
}
