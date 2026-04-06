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
  const heroImage = images[0]!;
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
    </a>
  );
}
