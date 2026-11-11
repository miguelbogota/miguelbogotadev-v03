/**
 * Project metadata returned by the published portfolio project index.
 *
 * @example
 * ```tsx
 * import type { Project } from '@/modules/projects';
 *
 * const project: Project = {
 *   id: 'portfolio-project',
 *   startedAt: '2026-01-01',
 *   endedAt: null,
 *   isCurrent: true,
 *   isArchived: false,
 *   aggregate: false,
 *   displayName: 'Portfolio Project',
 *   summary: 'A portfolio built with Next.js.',
 *   role: 'Software Engineer',
 *   companyName: 'Personal Project',
 *   industry: 'Developer Tools',
 *   tags: ['Next.js'],
 *   images: [],
 *   links: [],
 * };
 * ```
 */
export type Project = {
  /** Stable identifier used by routes and Markdown filenames. */
  id: string;
  /** Project start date in `YYYY-MM-DD` format. */
  startedAt: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
  /** Project end date in `YYYY-MM-DD` format, or `null` for work without an end date. */
  endedAt: `${number}${number}${number}${number}-${number}${number}-${number}${number}` | null;
  /** Whether the work is currently active. */
  isCurrent: boolean;
  /** Whether the project is retained for reference but no longer maintained. */
  isArchived: boolean;
  /** Whether the record summarizes multiple related projects. */
  aggregate: boolean;
  /** Human-readable project name. */
  displayName: string;
  /** Short description used by project cards and project details. */
  summary: string;
  /** Role held while completing the work. */
  role: string;
  /** Company or organization associated with the project. */
  companyName: string;
  /** Industry or product category associated with the work. */
  industry: string;
  /** Technologies and project topics used for display and search. */
  tags: string[];
  /** Screenshots and other project media. */
  images: Array<{
    /** Public image URL. */
    src: string;
    /** Accessible description of the image. */
    alt: string;
  }>;
  /** External project resources such as repositories and live websites. */
  links: Array<{
    /** Link text and accessible resource name. */
    label: string;
    /** Boxicons class names used to render the link icon. */
    icon: string;
    /** Public resource URL. */
    url: string;
  }>;
};
