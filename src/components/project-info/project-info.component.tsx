import './project-info.styles.scss';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { useAppState } from '@/state';

/** Props for the ProjectInfo component. */
export type ProjectInfoProps = {
  project: Project;
  backButton?: React.ReactNode;
  closeButton?: React.ReactNode;
};

/**
 * ProjectInfo component.
 * Displays detailed information about a project including name, summary, industry, year, role, challenge, solution, and images.
 * This component is designed to be reusable and can be used in both the drawer and standalone pages.
 */
export function ProjectInfo({ project, backButton, closeButton }: ProjectInfoProps) {
  const { displayName, summary, industry, startedAt, role, tags, challenge, solution, images } =
    project;
  const { content } = useAppState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = images[selectedImageIndex]!;

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Set document title when component mounts and clean up on unmount.
  useEffect(() => {
    document.title = `${content.title} - ${displayName}`;
    return () => {
      document.title = content.title;
    };
  }, []);

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

        {/* Challenge section */}
        <div className="section">
          <h2>{challenge.title}</h2>
          <p>{challenge.description}</p>
        </div>

        {/* Solution section */}
        <div className="section">
          <h2>{solution.title}</h2>
          <p>{solution.description}</p>
        </div>

        {/* Images section */}
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
                  aria-label={`${content.projectDetails.thumbnailLabel}${index + 1}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
