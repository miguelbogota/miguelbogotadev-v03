'use client';

import { useEffect } from 'react';

import { useAppState } from '@/modules/shared';

/** Subscribes the project drawer to browser back and forward navigation. */
export function useDrawerRouting() {
  const { setCurrentProjectId, setIsDrawerOpen } = useAppState();

  /**
   * Handles the popstate event when the user navigates back or forward.
   */
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);

      if (match?.[1]) {
        setCurrentProjectId(decodeURIComponent(match[1]));
        setIsDrawerOpen(true);
        return;
      }

      setCurrentProjectId(null);
      setIsDrawerOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setCurrentProjectId, setIsDrawerOpen]);
}
