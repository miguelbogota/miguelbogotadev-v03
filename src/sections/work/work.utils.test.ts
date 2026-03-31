import type { Project } from '@/types/project';
import { filterWorkProjects } from './work.utils';

describe('sections / Work / filterWorkProjects', () => {
  it('should return all projects when query is empty', () => {
    const projects: Project[] = [
      {
        id: 'a',
        startedAt: '2024-01-01',
        isCurrent: false,
        isArchived: false,
        displayName: 'Kinetic Resonance',
        summary: 'Fluid dynamics translated into static',
        role: 'Artist',
        companyName: 'Independent',
        industry: 'Digital Art',
        tags: ['Digital Art', '3D'],
        challenge: { title: 'x', description: 'x' },
        solution: { title: 'x', description: 'x' },
        images: [],
      },
    ];

    expect(filterWorkProjects(projects, '')).toEqual(projects);
    expect(filterWorkProjects(projects, '   ')).toEqual(projects);
  });

  it('should match case-insensitively across all displayed fields', () => {
    const projects: Project[] = [
      {
        id: 'a',
        startedAt: '2024-01-01',
        isCurrent: false,
        isArchived: false,
        displayName: 'Kinetic Resonance',
        summary: 'Fluid dynamics translated into static',
        role: 'Artist',
        companyName: 'Independent',
        industry: 'Digital Art',
        tags: ['Digital Art', '3D'],
        challenge: { title: 'x', description: 'x' },
        solution: { title: 'x', description: 'x' },
        images: [],
      },
      {
        id: 'b',
        startedAt: '2023-01-01',
        isCurrent: false,
        isArchived: false,
        displayName: 'Monolith System',
        summary: 'Brutalist dashboard design',
        role: 'Product Engineer',
        companyName: 'Independent',
        industry: 'Interface',
        tags: ['Interface'],
        challenge: { title: 'x', description: 'x' },
        solution: { title: 'x', description: 'x' },
        images: [],
      },
    ];

    expect(filterWorkProjects(projects, 'fluid')).toHaveLength(1);
    expect(filterWorkProjects(projects, 'DIGITAL')).toHaveLength(1);
    expect(filterWorkProjects(projects, '2023')).toHaveLength(1);
    expect(filterWorkProjects(projects, 'interface')).toHaveLength(1);
  });

  it('should support multi-token queries by normalizing whitespace', () => {
    const projects: Project[] = [
      {
        id: 'a',
        startedAt: '2024-01-01',
        isCurrent: false,
        isArchived: false,
        displayName: 'Digital Kinetic Resonance',
        summary: 'Fluid dynamics translated into static',
        role: 'Artist',
        companyName: 'Independent',
        industry: 'Digital Art',
        tags: ['Digital Art', '3D'],
        challenge: { title: 'x', description: 'x' },
        solution: { title: 'x', description: 'x' },
        images: [],
      },
      {
        id: 'b',
        startedAt: '2023-01-01',
        isCurrent: false,
        isArchived: false,
        displayName: 'Monolith System',
        summary: 'Brutalist dashboard design',
        role: 'Product Engineer',
        companyName: 'Independent',
        industry: 'Interface',
        tags: ['Interface'],
        challenge: { title: 'x', description: 'x' },
        solution: { title: 'x', description: 'x' },
        images: [],
      },
    ];

    // Should find project with both "digital" AND "2024"
    expect(filterWorkProjects(projects, 'digital 2024')).toHaveLength(1);
  });

  it('should return empty when there are no matches', () => {
    const projects: Project[] = [
      {
        id: 'a',
        startedAt: '2024-01-01',
        isCurrent: false,
        isArchived: false,
        displayName: 'Kinetic Resonance',
        summary: 'Fluid dynamics translated into static',
        role: 'Artist',
        companyName: 'Independent',
        industry: 'Digital Art',
        tags: ['Digital Art', '3D'],
        challenge: { title: 'x', description: 'x' },
        solution: { title: 'x', description: 'x' },
        images: [],
      },
    ];

    expect(filterWorkProjects(projects, 'zzz')).toEqual([]);
  });
});
