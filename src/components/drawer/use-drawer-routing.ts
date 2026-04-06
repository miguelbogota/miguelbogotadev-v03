import { useAppState } from '@/state';
import { useEffect } from 'react';

/**
 * Subscribes to the back and forward browser buttons, also restores scrolling position.
 */
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
  }, [isDrawerOpen]);

  /**
   * Handles the scroll event and saves the scroll position to sessionStorage.
   */
  useEffect(() => {
    const handleScroll = () => {
      window.sessionStorage.setItem('scroll-position', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Handles the load event and restores the scroll position from sessionStorage.
   */
  useEffect(() => {
    const handleLoad = () => {
      const scrollPosition = window.sessionStorage.getItem('scroll-position');

      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);
}
