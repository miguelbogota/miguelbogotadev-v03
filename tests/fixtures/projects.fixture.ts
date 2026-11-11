import type { Project } from '@/modules/projects';

/**
 * Representative project used by component and module tests.
 *
 * @example
 * ```tsx
 * import { projectFixture, render } from '@/testing';
 * import { ProjectCard } from '@/sections/work/project-card.component';
 *
 * render(<ProjectCard project={projectFixture} />);
 * ```
 */
export const projectFixture: Project = {
  id: 'portfolio-project',
  startedAt: '2026-01-01',
  endedAt: null,
  isCurrent: true,
  isArchived: false,
  aggregate: false,
  displayName: 'Portfolio Project',
  summary: 'A representative portfolio project used by tests.',
  role: 'Software Engineer',
  companyName: 'Personal Project',
  industry: 'Developer Tools',
  tags: ['Next.js', 'TypeScript'],
  images: [
    {
      src: 'https://example.com/project.png',
      alt: 'Portfolio project preview',
    },
    {
      src: 'https://example.com/project-details.png',
      alt: 'Portfolio project details',
    },
  ],
  links: [
    {
      label: 'Repository',
      icon: 'bxl bx-github',
      url: 'https://github.com/example/project',
    },
  ],
};

/**
 * Project collection used by tests that require application state.
 *
 * @example
 * ```tsx
 * import { projectsFixture } from '@/testing';
 * import { filterProjects } from '@/sections/work/filter-projects.function';
 *
 * const result = filterProjects(projectsFixture, 'Next.js');
 * ```
 */
export const projectsFixture: Project[] = [projectFixture];
