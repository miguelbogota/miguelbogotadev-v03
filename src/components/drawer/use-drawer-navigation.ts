import { useAppState } from '@/state';

/**
 * Hook to handle drawer navigation.
 * @returns A function that navigates to a given URL.
 */
export function useDrawerNavigation() {
  const { setIsDrawerOpen, setCurrentProjectId } = useAppState();

  return (url: string) => {
    window.history.pushState({}, '', url);

    if (url.includes('/project/')) {
      setIsDrawerOpen(true);
      const projectId = url.split('/').pop();
      if (projectId) {
        setCurrentProjectId(projectId);
      }
    } else {
      setIsDrawerOpen(false);
      setCurrentProjectId(null);
    }
  };
}
