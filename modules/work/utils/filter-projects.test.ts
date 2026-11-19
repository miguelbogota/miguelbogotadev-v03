import { projectsFixture } from '@/testing';

import { filterProjects } from './filter-projects.function';

const mockedProjects = projectsFixture;

describe('sections / Work / filterProjects', () => {
  it('should return all projects when query is empty', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, '')).toEqual(projects);
    expect(filterProjects(projects, '   ')).toEqual(projects);
  });

  it('should match case-insensitively across all displayed fields', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, 'PORTFOLIO')).toHaveLength(1);
    expect(filterProjects(projects, 'DEVELOPER TOOLS')).toHaveLength(1);
    expect(filterProjects(projects, '2026')).toHaveLength(1);
    expect(filterProjects(projects, 'Next.js')).toHaveLength(1);
  });

  it('should support multi-token queries by normalizing whitespace', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, 'portfolio 2026')).toHaveLength(1);
  });

  it('should return empty when there are no matches', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, 'zzz')).toEqual([]);
  });
});
