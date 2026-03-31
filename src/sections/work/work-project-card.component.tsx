import './work-project-card.styles.scss';

import { Link } from '@tanstack/react-router';
import type { Project } from '@/types/project';
import type { Content } from '@/types/content';

/**
 * Props for the WorkProjectCard component.
 */
export type WorkProjectCardProps = Content['work']['card'] & {
  project: Project;
};

/**
 * Work project card component.
 * Displays project information with image, details, and link to project page.
 * Features 65/40 image-to-content layout with hover effects.
 */
export function WorkProjectCard(props: WorkProjectCardProps) {
  const { project, aria, viewDetails } = props;
  const { id, displayName, summary, industry, startedAt, images } = project;
  const year = startedAt.split('-')[0] ?? '';
  const heroImage = images[0];

  return (
    <Link
      to="/project/$projectId"
      params={{ projectId: id }}
      className="work-project-card"
      aria-label={`${aria.leadingLabel} ${displayName} ${aria.trailingLabel} ${industry}, ${year}`}
    >
      <article>
        <div className="media" aria-hidden={!heroImage}>
          <img src={heroImage.src} alt={heroImage.alt} loading="lazy" />
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
    </Link>
  );
}
