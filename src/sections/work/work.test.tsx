import { fireEvent, render, screen } from '@testing-library/react';
import { type LinkProps } from '@tanstack/react-router';

import { Work } from './work.component';
import type { Project } from '@/types/project';

vi.mock('@tanstack/react-router', () => ({
  Link: (props: LinkProps) => <a href={props.to}>{props.children as React.ReactNode}</a>,
}));

Element.prototype.scrollIntoView = vi.fn();

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
  {
    id: 'project-c',
    startedAt: '2022-01-01',
    isCurrent: false,
    isArchived: false,
    displayName: 'Project C',
    summary: 'Third project description',
    role: 'Developer',
    companyName: 'Company C',
    industry: 'Web',
    tags: ['Web', 'JavaScript'],
    challenge: { title: 'x', description: 'x' },
    solution: { title: 'x', description: 'x' },
    images: [
      {
        src: 'https://picsum.photos/seed/project-c/1200/800',
        alt: 'Project C image',
      },
    ],
    links: { website: '/project/project-c' },
  },
];

const manyProjects: Project[] = [
  ...mockProjects,
  {
    id: 'c',
    startedAt: '2022-01-01',
    isCurrent: false,
    isArchived: false,
    displayName: 'Project C',
    summary: 'Third project description',
    role: 'Developer',
    companyName: 'Company C',
    industry: 'Web',
    tags: ['Web', 'JavaScript'],
    challenge: { title: 'x', description: 'x' },
    solution: { title: 'x', description: 'x' },
    images: [
      {
        src: 'https://picsum.photos/seed/project-c/1200/800',
        alt: 'Project C image',
      },
    ],
    links: { website: '/project/project-c' },
  },
  {
    id: 'd',
    startedAt: '2021-01-01',
    isCurrent: false,
    isArchived: false,
    displayName: 'Project D',
    summary: 'Fourth project description',
    role: 'Designer',
    companyName: 'Company D',
    industry: 'Mobile',
    tags: ['Mobile', 'iOS'],
    challenge: { title: 'x', description: 'x' },
    solution: { title: 'x', description: 'x' },
    images: [
      {
        src: 'https://picsum.photos/seed/project-d/1200/800',
        alt: 'Project D image',
      },
    ],
    links: { website: '/project/project-d' },
  },
];

describe('sections / Work', () => {
  it('should render a searchable list of projects', () => {
    render(
      <Work
        title="Selected Works"
        description="A curated archive"
        noResults="No results found."
        searchBar={{
          label: 'Search works',
          placeholder: 'Search projects…',
        }}
        card={{
          aria: {
            leadingLabel: 'View details for',
            trailingLabel: 'project -',
          },
          viewDetails: 'VIEW DETAILS',
        }}
        pagination={{
          previous: 'Go to previous page',
          goToPage: 'Go to page',
          next: 'Go to next page',
        }}
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
        title="Selected Works"
        description="A curated archive"
        noResults="No results found."
        searchBar={{
          label: 'Search works',
          placeholder: 'Search projects…',
        }}
        card={{
          aria: {
            leadingLabel: 'View details for',
            trailingLabel: 'project -',
          },
          viewDetails: 'VIEW DETAILS',
        }}
        pagination={{
          previous: 'Go to previous page',
          goToPage: 'Go to page',
          next: 'Go to next page',
        }}
        projects={mockProjects}
      />,
    );

    const input = screen.getByRole('searchbox', { name: /search/i });
    fireEvent.change(input, { target: { value: 'zzzz' } });

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('should render pagination controls when there are multiple pages', () => {
    render(
      <Work
        title="Selected Works"
        description="A curated archive"
        noResults="No results found."
        searchBar={{
          label: 'Search works',
          placeholder: 'Search projects…',
        }}
        card={{
          aria: {
            leadingLabel: 'View details for',
            trailingLabel: 'project -',
          },
          viewDetails: 'VIEW DETAILS',
        }}
        pagination={{
          previous: 'Go to previous page',
          goToPage: 'Go to page',
          next: 'Go to next page',
        }}
        projects={manyProjects}
      />,
    );

    // Should show pagination controls (4 projects = 2 pages)
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Go to page \d+/ })).toHaveLength(2); // Page numbers
  });

  it('should handle page navigation correctly', () => {
    const { getAllByRole } = screen;

    render(
      <Work
        title="Selected Works"
        description="A curated archive"
        noResults="No results found."
        searchBar={{
          label: 'Search works',
          placeholder: 'Search projects…',
        }}
        card={{
          aria: {
            leadingLabel: 'View details for',
            trailingLabel: 'project -',
          },
          viewDetails: 'VIEW DETAILS',
        }}
        pagination={{
          previous: 'Go to previous page',
          goToPage: 'Go to page',
          next: 'Go to next page',
        }}
        projects={manyProjects}
      />,
    );

    // Click page 2
    const pageButtons = getAllByRole('button', { name: /Go to page \d+/ });
    const page2Button = pageButtons[1]; // Second button (page 2)
    fireEvent.click(page2Button);

    // Should show page 2 is active
    expect(pageButtons[1]).toHaveClass('work-pagination-number', 'active');
  });

  it('should not render pagination when there is less then 3 or 3 projects', () => {
    render(
      <Work
        title="Selected Works"
        description="A curated archive"
        noResults="No results found."
        searchBar={{
          label: 'Search works',
          placeholder: 'Search projects…',
        }}
        card={{
          aria: {
            leadingLabel: 'View details for',
            trailingLabel: 'project -',
          },
          viewDetails: 'VIEW DETAILS',
        }}
        pagination={{
          previous: 'Go to previous page',
          goToPage: 'Go to page',
          next: 'Go to next page',
        }}
        projects={mockProjects}
      />,
    );

    // Should not show pagination controls (3 projects = 1 page)
    expect(screen.queryByRole('button', { name: 'Go to previous page' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Go to next page' })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('button', { name: /Go to page \d+/ })).toHaveLength(0);
  });
});
