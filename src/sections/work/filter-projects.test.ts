import { mockState } from '@/testing';
import { filterProjects } from './filter-projects.function';

const mockedProjects = mockState.projects;

describe('sections / Work / filterProjects', () => {
  it('should return all projects when query is empty', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, '')).toEqual(projects);
    expect(filterProjects(projects, '   ')).toEqual(projects);
  });

  it('should match case-insensitively across all displayed fields', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, 'MiguelbogotaDev')).toHaveLength(3);
    expect(filterProjects(projects, 'DIGITAL')).toHaveLength(1);
    expect(filterProjects(projects, '2023')).toHaveLength(1);
    expect(filterProjects(projects, 'interface')).toHaveLength(4);
  });

  it('should support multi-token queries by normalizing whitespace', () => {
    const projects = mockedProjects;

    // Should find project with both "miguelbogotadev" AND "2026"
    expect(filterProjects(projects, 'miguelbogotadev 2026')).toHaveLength(1);
  });

  it('should return empty when there are no matches', () => {
    const projects = mockedProjects;

    expect(filterProjects(projects, 'zzz')).toEqual([]);
  });
});
