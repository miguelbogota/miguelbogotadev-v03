import { useLayoutEffect, useRef, useState } from 'react';

/** Ensures the value is never negative. */
const clamp = (value: number) => Math.max(0, value);

/** Checks if a value is within a range (inclusive). */
const isBetween = (value: number, floor: number, ceil: number) => value >= floor && value <= ceil;

/** Configuration for useScrollSpy. */
export type UseScrollSpyOptions<T extends string = string> = {
  ids: T[];
  defaultSection?: T;
  offset?: number;
};

/** Returns the id of the section currently visible in the viewport. */
export function useScrollSpy<T extends string = string>(options: UseScrollSpyOptions<T>) {
  const { ids, defaultSection = '', offset = 1 } = options;

  const prevActiveSectionId = useRef('');
  const [activeSectionId, setActiveSectionId] = useState(defaultSection as T);

  useLayoutEffect(() => {
    const elements = ids.map((section) => ({
      section,
      element: document.getElementById(section),
    }));

    const listener = () => {
      const scroll = window.scrollY;

      const position = elements.find(({ element }) => {
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const top = clamp(rect.top + scroll - offset);
        const bottom = clamp(rect.bottom + scroll - offset);

        return isBetween(scroll, top, bottom);
      });

      const currentSectionId = position?.section ?? '';

      if (prevActiveSectionId.current === currentSectionId) return;

      prevActiveSectionId.current = currentSectionId;
      setActiveSectionId(currentSectionId as T);
    };

    listener();

    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, offset]);

  return activeSectionId;
}
