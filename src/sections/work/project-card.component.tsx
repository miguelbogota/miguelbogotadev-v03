import type { CSSProperties } from 'react';
import { useAppState } from '@/state';
import { useDrawerNavigation } from '@/components/drawer';

/** Props for the ProjectCard component. */
export type ProjectCardProps = {
  project: Project;
};

/**
 * Work project card component.
 * Displays project information with image, details, and link to project page.
 * Features 65/40 image-to-content layout with hover effects.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const {
    content: {
      work: {
        card: { aria, viewDetails },
      },
    },
  } = useAppState();
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
    <a
      href={`/project/${id}`}
      onClick={handleCardClick}
      aria-label={`${aria.leadingLabel} ${displayName} ${aria.trailingLabel} ${industry}, ${year}`}
    >
      <article>
        <div className="media">
          {heroImage ? (
            <img src={heroImage.src} alt={heroImage.alt} loading="lazy" />
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

        <div className="content">
          <div className="meta">{`${industry} — ${year}`}</div>

          <h3>{displayName}</h3>
          <p className="overline">{summary}</p>

          <span className="action" aria-hidden="true">
            {viewDetails}
          </span>
        </div>
      </article>
    </a>
  );
}
