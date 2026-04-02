import './project-info.styles.scss';

/** Props for the ProjectInfo component. */
export type ProjectInfoProps = {
  project: Project;
  showTitle?: boolean;
};

/**
 * ProjectInfo component.
 * Displays detailed information about a project including name, summary, industry, year, and hero image.
 * This component is designed to be reusable and can be used in both the drawer and standalone pages.
 */
export function ProjectInfo({ project, showTitle = true }: ProjectInfoProps) {
  const { displayName, summary, industry, startedAt, images } = project;
  const year = startedAt.split('-')[0] ?? '';
  const heroImage = images[0]!;

  return (
    <div className="project-info">
      <div className="project-info__header">
        <div className="project-info__meta">{`${industry} — ${year}`}</div>
        {showTitle && <h2 className="project-info__title">{displayName}</h2>}
        <p className="project-info__summary">{summary}</p>
      </div>

      <div className="project-info__media" aria-hidden={!heroImage}>
        <img src={heroImage.src} alt={heroImage.alt} loading="lazy" />
      </div>
    </div>
  );
}
