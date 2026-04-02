import { useAppState } from '@/state';

/**
 * Hook to handle drawer navigation.
 * @returns A function that navigates to a given URL.
 */
export function useDrawerNavigation() {
  const { setIsDrawerOpen } = useAppState();

  return (url: string) => {
    setIsDrawerOpen(true);
    window.history.pushState({}, '', url);
  };
}
