import { fireEvent, render, screen } from '@testing-library/react';

import { Work } from './work.component';
import type { Project } from '@/types/project';

// Mock project data for testing
const mockProjects: Project[] = [
  {
    id: 'kinetic-resonance',
    startedAt: '2024-01-01',
    isCurrent: false,
    isArchived: false,
    displayName: 'Kinetic Resonance',
    summary: 'An exploration of fluid dynamics translated into static digital forms.',
    role: 'Artist / Engineer',
    companyName: 'Independent',
    industry: 'Digital Art',
    tags: ['Digital Art', '3D'],
    challenge: { title: 'Translate motion into stillness', description: '—' },
    solution: { title: 'Simulated flow fields', description: '—' },
    images: [
      {
        src: 'https://picsum.photos/seed/kinetic/1200/800',
        alt: 'Abstract flowing forms and motion-like texture',
      },
    ],
    links: { website: '/project/kinetic-resonance' },
  },
  {
    id: 'monolith-system',
    startedAt: '2023-01-01',
    isCurrent: false,
    isArchived: false,
    displayName: 'Monolith System',
    summary: 'A brutalist approach to dashboard design, focused on density and clarity.',
    role: 'Product Engineer',
    companyName: 'Independent',
    industry: 'Interface',
    tags: ['Interface'],
    challenge: { title: 'Design for density', description: '—' },
    solution: { title: 'Hierarchical layout', description: '—' },
    images: [
      {
        src: 'https://picsum.photos/seed/monolith/1200/800',
        alt: 'Minimal architectural surfaces with strong contrast',
      },
    ],
    links: { website: '/project/monolith-system' },
  },
];

describe('sections / Work', () => {
  it('should render a searchable list of projects', () => {
    render(
      <Work
        content={{ title: 'Selected Works', description: 'A curated archive' }}
        projects={mockProjects}
      />,
    );

    expect(screen.getByRole('searchbox', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByText('Kinetic Resonance')).toBeInTheDocument();
    expect(screen.getByText('Monolith System')).toBeInTheDocument();

    const input = screen.getByRole('searchbox', { name: /search/i });
    fireEvent.change(input, { target: { value: 'monolith' } });

    expect(screen.queryByText('Kinetic Resonance')).not.toBeInTheDocument();
    expect(screen.getByText('Monolith System')).toBeInTheDocument();
  });

  it('should render an empty state when there are no matches', () => {
    render(
      <Work
        content={{ title: 'Selected Works', description: 'A curated archive' }}
        projects={mockProjects}
      />,
    );

    const input = screen.getByRole('searchbox', { name: /search/i });
    fireEvent.change(input, { target: { value: 'zzzz' } });

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
