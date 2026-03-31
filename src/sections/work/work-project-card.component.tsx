import './work-project-card.styles.scss';

import type { Project } from '@/types/project';

export interface WorkProjectCardProps {
  project: Project;
}

export function WorkProjectCard(props: WorkProjectCardProps) {
  const { project } = props;
  const { id, displayName, summary, industry, startedAt, images } = project;
  const year = startedAt.split('-')[0] ?? '';
  const heroImage = images.at(0);

  return (
    <a
      href={`/project/${id}`}
      className="work-project-card-link"
      aria-label={`View details for ${displayName} project - ${industry}, ${year}`}
    >
      <article className="work-project-card">
        <div className="media" aria-hidden={!heroImage}>
          {heroImage ? <img src={heroImage.src} alt={heroImage.alt} loading="lazy" /> : null}
        </div>

        <div className="content">
          <div className="meta">{`${industry} — ${year}`}</div>

          <h3>{displayName}</h3>
          <p className="overline">{summary}</p>

          <span className="cta" aria-hidden="true">
            VIEW DETAILS
          </span>
        </div>
      </article>
    </a>
  );
}
