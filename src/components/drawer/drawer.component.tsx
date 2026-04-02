import './drawer.styles.scss';

import { useAppState } from '@/state';

/**
 * Drawer component.
 */
export function Drawer() {
  const { isDrawerOpen } = useAppState();

  return <dialog open={isDrawerOpen}>Drawer</dialog>;
}
