import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useEffect, useRef, useState } from 'react';

/**
 * Hook allows to track the active state for the links underneath line.
 */
export function useActiveIndicator(ids: string[]) {
  const activeSection = useScrollSpy({
    ids,
    defaultSection: ids[0],
    offset: 65, // Navigation bar height offset plus 1.
  });

  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' });

  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>(
    Object.fromEntries(ids.map((id) => [id, null])),
  );

  /**
   * Update indicator position based on active link
   */
  useEffect(() => {
    const activeLink = linksRef.current[activeSection];

    if (activeLink) {
      setIndicatorStyle({
        left: `${activeLink.offsetLeft}px`,
        width: `${activeLink.offsetWidth}px`,
      });
    }
  }, [activeSection]);

  return {
    activeSection,
    indicatorStyle,
    linksRef,
  };
}
