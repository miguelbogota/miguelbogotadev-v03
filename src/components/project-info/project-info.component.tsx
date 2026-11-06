import './project-info.styles.scss';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { getProjectContent } from '@/server-actions/get-project-content';

const SKELETON_LINES = ['heading', 'long', 'medium', 'long', 'short', 'heading', 'long'] as const;

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
};

/**
 * ProjectInfo component.
 * Displays project metadata and renders its long-form Markdown content.
 * This component is designed to be reusable and can be used in both the drawer and standalone pages.
 */
export function ProjectInfo({ project, backButton, closeButton }: ProjectInfoProps) {
  const { displayName, summary, industry, startedAt, role, tags, images, links } = project;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [content, setContent] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const selectedImage = images[selectedImageIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Set document title when component mounts and clean up on unmount.
  useEffect(() => {
    document.title = `Miguel Bogota - ${displayName}`;
    return () => {
      document.title = 'Miguel Bogota';
    };
  }, [displayName]);

  // Project metadata is rendered immediately; the long-form content is always loaded in-browser.
  useEffect(() => {
    let isCurrent = true;
    setContent(null);
    setIsLoadingContent(true);
    setSelectedImageIndex(0);

    getProjectContent(project).then((markdown) => {
      if (!isCurrent) return;
      setContent(markdown);
      setIsLoadingContent(false);
    });

    return () => {
      isCurrent = false;
    };
  }, [project.id]);

  return (
    <div>
      {/* Action buttons container - only show if buttons are present */}
      <Container className="details-actions" maxWidth="50000px">
        <div className="action">{backButton}</div>
        <div className="action">{closeButton}</div>
      </Container>

      <Container className="project-info" maxWidth="900px">
        {/* Project header */}
        <div className="header">
          <p>{startedAt}</p>
          <h1 id="drawer-title">{displayName}</h1>
          <span>{role}</span>
          {links && links.length > 0 && (
            <div className="links" aria-label={`${displayName} links`}>
              {links.map(({ url, label, icon }) => (
                <a
                  key={`${url}-${label}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${displayName}: ${label} (opens in a new tab)`}
                  title={`${label} (opens in a new tab)`}
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

        {isLoadingContent ? (
          <ProjectContentSkeleton />
        ) : content ? (
          <article className="markdown">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        ) : (
          <p className="content-status">Project details are unavailable.</p>
        )}

        {/* Images section */}
        {selectedImage ? (
          <div className="images">
            {/* Main image */}
            <div className="main-image">
              <img src={selectedImage.src} alt={selectedImage.alt} loading="lazy" />
            </div>

            {/* Thumbnail gallery */}
            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={clsx('thumbnail', index === selectedImageIndex && 'active')}
                    onClick={() => handleThumbnailClick(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </Container>
      <Footer />
    </div>
  );
}
