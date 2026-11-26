import { type Project } from '@/modules/project';

/**
 * Representative project used by component and module tests.
 *
 * @example
 * ```tsx
 * import { projectFixture, render } from '@/testing';
 * import { ProjectCard } from '@/modules/work/components/project-card';
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
  contentLayout: 'overview',
  displayName: 'Portfolio Project',
  summary: 'A representative portfolio project used by tests.',
  role: 'Software Engineer',
  companyName: 'Personal Project',
  industry: 'Developer Tools',
  tags: ['Next.js', 'TypeScript'],
  thumbnail: {
    src: 'https://example.com/project-thumbnail.png',
    alt: 'Portfolio project thumbnail',
  },
  artwork: {
    src: 'https://example.com/project-artwork.png',
    alt: 'Portfolio project artwork',
  },
  links: [
    {
      label: 'Repository',
      icon: 'bxl bx-github',
      url: 'https://github.com/example/project',
    },
  ],
  initiatives: [
    {
      id: 'architecture',
      displayName: 'Platform Architecture',
      summary: 'A shared platform designed for independent product teams.',
      role: 'Senior Software Engineer',
      industry: 'Developer Infrastructure',
      tags: ['Architecture', 'React'],
      links: [],
    },
    {
      id: 'delivery',
      displayName: 'Progressive Delivery',
      summary: 'A controlled rollout system for high-traffic product changes.',
      role: 'Senior Software Engineer',
      industry: 'Developer Infrastructure',
      tags: ['Experimentation', 'Observability'],
      links: [],
    },
  ],
};

/**
 * Project collection used by tests that require application state.
 *
 * @example
 * ```tsx
 * import { projectsFixture } from '@/testing';
 * import { filterProjects } from '@/modules/work/utils/filter-projects.function';
 *
 * const result = filterProjects(projectsFixture, 'Next.js');
 * ```
 */
export const projectsFixture: Project[] = [projectFixture];
