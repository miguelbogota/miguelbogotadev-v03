import './drawer.styles.scss';

import { useEffect, useRef } from 'react';
import { useAppState } from '@/state';
import { ProjectInfo } from '@/components/project-info';
import { useDrawerNavigation } from './use-drawer-navigation';

/**
 * Drawer component.
 * Displays project details in a slide-up drawer with backdrop and close functionality.
 * The drawer is always present in the DOM but only visible when open.
 */
export function Drawer() {
  const { isDrawerOpen, setIsDrawerOpen, projects, currentProjectId, content } = useAppState();
  const navigate = useDrawerNavigation();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const currentProject = projects.find((p) => p.id === currentProjectId) ?? null;

  const handleClose = () => {
    navigate('/');
    setIsDrawerOpen(false);
  };

  // Handles `ESC` key to close the drawer.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Focus trap for accessibility
  useEffect(() => {
    if (isDrawerOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      const dialogElement = dialogRef.current!;

      const focusableElements = dialogElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as NodeListOf<HTMLElement>;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      setTimeout(() => {
        firstElement?.focus();
      }, 10);

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      dialogElement.addEventListener('keydown', handleTabKeyPress);
      return () => dialogElement.removeEventListener('keydown', handleTabKeyPress);
    }

    setTimeout(() => {
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    }, 10);

    return () => {};
  }, [isDrawerOpen]);

  return (
    <>
      <div
        ref={dialogRef}
        className="drawer"
        role="dialog"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
        data-open={isDrawerOpen}
      >
        {currentProject && (
          <ProjectInfo
            project={currentProject}
            closeButton={
              <button onClick={handleClose} aria-label={content.projectDetails.closeButton}>
                ×
              </button>
            }
          />
        )}
      </div>
      <div className="drawer-backdrop" ref={backdropRef} onClick={handleClose} />
    </>
  );
}
