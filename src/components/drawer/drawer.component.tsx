import './drawer.styles.scss';

import { useEffect, useRef } from 'react';
import { useAppState } from '@/state';
import { ProjectInfo } from '@/components/project-info';

/**
 * Drawer component.
 * Displays project details in a slide-up drawer with backdrop and close functionality.
 * The drawer is always present in the DOM but only visible when open.
 */
export function Drawer() {
  const { isDrawerOpen, setIsDrawerOpen, projects, url } = useAppState();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Get current project from URL
  const getCurrentProject = () => {
    const pathParts = url.split('/');
    const projectId = pathParts[pathParts.length - 1];

    if (projectId && projectId !== 'project') {
      return projects.find((p) => p.id === projectId) || projects[0] || null;
    }

    return projects[0] || null;
  };

  const currentProject = getCurrentProject();

  const handleClose = () => {
    setIsDrawerOpen(false);
    // Navigate back to remove project URL when closing drawer
    window.history.pushState({}, '', '/');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  /** Sync dialog state with isDrawerOpen */
  useEffect(() => {
    if (!dialogRef.current) return;

    const handleClose = () => {
      setIsDrawerOpen(false);
      window.history.pushState({}, '', '/');
    };

    dialogRef.current.addEventListener('close', handleClose);
    return () => dialogRef.current?.removeEventListener('close', handleClose);
  }, []);

  /** HTML Semantic Dialog Management */
  useEffect(() => {
    if (isDrawerOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDrawerOpen]);

  return (
    <dialog ref={dialogRef} onClick={handleBackdropClick} aria-labelledby="drawer-title">
      <button id="drawer-close" className="close" onClick={handleClose} aria-label="Close drawer">
        x
      </button>

      {currentProject && (
        <div className="project">
          <h1 id="drawer-title">{currentProject.displayName}</h1>
          <ProjectInfo project={currentProject} showTitle={false} />
        </div>
      )}
    </dialog>
  );
}
