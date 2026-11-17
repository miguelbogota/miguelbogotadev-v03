'use client';

import { useEffect } from 'react';

import { useAppState } from '@/modules/shared';

/** Subscribes to browser back and forward navigation for the legacy project drawer. */
export function useDrawerRouting() {
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();

  /**
   * Handles the popstate event when the user navigates back or forward.
   */
  useEffect(() => {
    const handlePopState = () => {
      if (isDrawerOpen) {
        setIsDrawerOpen(false);
        return;
      }

      window.location.href = window.location.href;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isDrawerOpen, setIsDrawerOpen]);
}
