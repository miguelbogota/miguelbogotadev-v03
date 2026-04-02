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
  const { isDrawerOpen, setIsDrawerOpen, projects, currentProjectId } = useAppState();
  const navigate = useDrawerNavigation();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const currentProject = projects.find((p) => p.id === currentProjectId) ?? null;

  /** Sync dialog state with isDrawerOpen */
  useEffect(() => {
    if (!dialogRef.current) return;

    const handleClose = () => {
      navigate('/');
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
    <dialog ref={dialogRef} aria-labelledby="drawer-title" closedby="any">
      {currentProject && (
        <ProjectInfo
          project={currentProject}
          backButton={
            <button onClick={() => setIsDrawerOpen(false)} aria-label="Close drawer">
              Close
            </button>
          }
        />
      )}
    </dialog>
  );
}
