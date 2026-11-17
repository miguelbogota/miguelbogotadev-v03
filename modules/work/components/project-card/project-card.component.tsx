'use client';

import './project-card.styles.scss';

import Link from 'next/link';
import { type CSSProperties } from 'react';

import { type Project, useDrawerNavigation } from '@/modules/project';

/** Props for the ProjectCard component. */
export type ProjectCardProps = {
  project: Project;
};

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

  const { id, displayName, summary, industry, startedAt, images } = project;
  const year = startedAt.split('-')[0] ?? '';
  const heroImage = images[0];
  // Stable across server rendering, filtering, and pagination. A negative delay
  // starts each artwork partway through its full eight-second alternate cycle.
  const animationSeed = Array.from(id).reduce(
    (seed, character) => (Math.imul(seed, 31) + character.charCodeAt(0)) >>> 0,
    0,
  );
  const navigate = useDrawerNavigation();

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
          {heroImage ? (
            <>
              {/* Project media uses remote URLs that are not configured for Next image optimization yet. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage.src} alt={heroImage.alt} loading="lazy" />
            </>
          ) : (
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
