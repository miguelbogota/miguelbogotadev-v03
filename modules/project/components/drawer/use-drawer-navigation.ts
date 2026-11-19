'use client';

import { useAppState } from '@/modules/shared';

/**
 * Hook to handle drawer navigation.
 * @returns A function that navigates to a given URL.
 */
export function useDrawerNavigation() {
  const { setIsDrawerOpen, setCurrentProjectId } = useAppState();

  return (url: string) => {
    if (url.includes('/project/')) {
      const projectId = url.split('/').pop();
      const state = { drawerProjectId: projectId };

      if (window.history.state?.drawerProjectId) {
        window.history.replaceState(state, '', url);
      } else {
        window.history.pushState(state, '', url);
      }

      setIsDrawerOpen(true);

      if (projectId) {
        setCurrentProjectId(projectId);
      }

      return;
    }

    if (window.history.state?.drawerProjectId) {
      window.history.back();
    } else {
      window.history.replaceState({}, '', url);
    }

    setIsDrawerOpen(false);
    setCurrentProjectId(null);
  };
}
