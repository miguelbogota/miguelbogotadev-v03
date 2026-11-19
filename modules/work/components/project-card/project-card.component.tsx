'use client';

import './project-card.styles.scss';

import Link from 'next/link';
import { type CSSProperties, useLayoutEffect, useRef, useState } from 'react';

import { analyticsService } from '@/modules/analytics';
import { type Project, useDrawerNavigation } from '@/modules/project';

/** Props for the ProjectCard component. */
export type ProjectCardProps = {
  project: Project;
};

/** Thumbnail URLs successfully loaded during the current browser session. */
const loadedThumbnailSources = new Set<string>();

/**
 * Work project card component.
 * Displays project information with image, details, and link to project page.
 * Features 65/40 image-to-content layout with hover effects.
 *
 * @param props - Project metadata rendered by the card.
 * @returns A project link that supports drawer navigation.
 */
export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  const { id, displayName, summary, industry, startedAt, thumbnail } = project;
  const year = startedAt.split('-')[0] ?? '';
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(() =>
    loadedThumbnailSources.has(thumbnail.src),
  );
  const thumbnailRef = useRef<HTMLImageElement>(null);
  // Stable across server rendering, filtering, and pagination. A negative delay
  // starts each artwork partway through its full eight-second alternate cycle.
  const animationSeed = Array.from(id).reduce(
    (seed, character) => (Math.imul(seed, 31) + character.charCodeAt(0)) >>> 0,
    0,
  );
  const navigate = useDrawerNavigation();

  useLayoutEffect(() => {
    const thumbnailElement = thumbnailRef.current;

    if (thumbnailElement?.complete && thumbnailElement.naturalWidth > 0) {
      loadedThumbnailSources.add(thumbnail.src);
      setIsThumbnailLoaded(true);
    }
  }, [thumbnail.src]);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();
    analyticsService.trackProject(id);
    navigate(`/project/${id}`);
  };

  return (
    <Link
      className="project-card"
      href={`/project/${id}`}
      onClick={handleCardClick}
      scroll={false}
      aria-label={`View details for ${displayName} project - ${industry}, ${year}`}
    >
      <article>
        <div>
          {!isThumbnailLoaded && (
            <div
              className="project-artwork"
              style={
                {
                  '--artwork-delay': `-${animationSeed % 8000}ms`,
                } as CSSProperties
              }
              aria-hidden="true"
            />
          )}
          {/* Project media uses remote URLs that are not configured for Next image optimization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={thumbnailRef}
            src={thumbnail.src}
            alt={thumbnail.alt}
            width={1200}
            height={800}
            loading="lazy"
            data-loaded={isThumbnailLoaded}
            onLoad={() => {
              loadedThumbnailSources.add(thumbnail.src);
              setIsThumbnailLoaded(true);
            }}
            onError={() => {
              loadedThumbnailSources.delete(thumbnail.src);
              setIsThumbnailLoaded(false);
            }}
          />
        </div>

        <div>
          <div>{`${industry} — ${year}`}</div>

          <h3>{displayName}</h3>
          <p className="overline">{summary}</p>

          <span aria-hidden="true">VIEW DETAILS</span>
        </div>
      </article>
    </Link>
  );
}
