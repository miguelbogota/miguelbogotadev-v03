'use client';

import './drawer.styles.scss';

import { useCallback, useEffect, useRef } from 'react';

import { useAppState } from '@/modules/shared';

import { ProjectInfo } from '../project-info';
import { useDrawerNavigation } from './use-drawer-navigation';
import { useDrawerRouting } from './use-drawer-routing';

/** Selector for controls that participate in the drawer focus loop. */
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Returns focusable controls from the drawer and any higher interactive overlay.
 *
 * @param dialogElement - Open project drawer element.
 * @returns Controls ordered for forward and backward keyboard navigation.
 */
function getFocusableElements(dialogElement: HTMLElement) {
  const drawerElements = Array.from(
    dialogElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
  const overlayElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-inert-exempt]'),
  ).flatMap((element) => Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)));

  return [...drawerElements, ...overlayElements];
}

/**
 * Drawer component.
 * Displays project details in a slide-up drawer with backdrop and close functionality.
 * The drawer is always present in the DOM but only visible when open.
 */
export function Drawer() {
  const { isDrawerOpen, setIsDrawerOpen, projects, currentProjectId } = useAppState();
  const navigate = useDrawerNavigation();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const currentProject = projects.find((p) => p.id === currentProjectId) ?? null;

  useDrawerRouting();

  const handleClose = useCallback(() => {
    navigate('/');
    setIsDrawerOpen(false);
  }, [navigate, setIsDrawerOpen]);

  // Handles `ESC` key to close the drawer.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (isDrawerOpen && event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose, isDrawerOpen]);

  // Focus trap for accessibility
  useEffect(() => {
    if (isDrawerOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;

      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return;
      }

      const firstElement = getFocusableElements(dialogElement)[0];

      setTimeout(() => {
        firstElement?.focus();
      }, 10);

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          const focusableElements = getFocusableElements(dialogElement);
          const currentFirstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey && document.activeElement === currentFirstElement) {
            event.preventDefault();
            lastElement?.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            currentFirstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKeyPress);
      return () => document.removeEventListener('keydown', handleTabKeyPress);
    }

    setTimeout(() => {
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    }, 10);

    return () => {};
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    const backdropElement = backdropRef.current;

    if (!isDrawerOpen || !dialogElement || !backdropElement) {
      return undefined;
    }

    const siblings = Array.from(dialogElement.parentElement?.children ?? []).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== dialogElement &&
        element !== backdropElement &&
        !element.hasAttribute('data-inert-exempt'),
    );
    const previousInertState = new Map(
      siblings.map((element) => [element, element.hasAttribute('inert')]),
    );

    siblings.forEach((element) => element.setAttribute('inert', ''));

    return () => {
      previousInertState.forEach((wasInert, element) => {
        if (!wasInert) {
          element.removeAttribute('inert');
        }
      });
    };
  }, [isDrawerOpen]);

  return (
    <>
      <div
        ref={dialogRef}
        className="drawer"
        role="dialog"
        aria-modal={isDrawerOpen ? 'true' : undefined}
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
        data-open={isDrawerOpen}
      >
        {currentProject && (
          <ProjectInfo
            project={currentProject}
            closeButton={
              <button onClick={handleClose} aria-label="Close project details">
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
