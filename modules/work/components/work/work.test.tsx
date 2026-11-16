import { fireEvent, projectFixture, render, screen } from '@/testing';

import { WorkSection } from './work.component';

const projects = [
  projectFixture,
  { ...projectFixture, id: 'project-two', displayName: 'Project Two' },
  { ...projectFixture, id: 'project-three', displayName: 'Project Three' },
  { ...projectFixture, id: 'project-four', displayName: 'Project Four' },
];

describe('modules / work', () => {
  it('should render projects supplied by the server route', () => {
    render(<WorkSection projects={projects} />);

    expect(screen.getByText(projectFixture.displayName)).toBeInTheDocument();
    expect(screen.getByText('Project Two')).toBeInTheDocument();
    expect(screen.getByText('Project Three')).toBeInTheDocument();
    expect(screen.queryByText('Project Four')).not.toBeInTheDocument();
  });

  it('should filter projects and reset pagination from the search field', () => {
    render(<WorkSection projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }));
    expect(screen.getByText('Project Four')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search works' }), {
      target: { value: 'Project Two' },
    });

    expect(screen.getByText('Project Two')).toBeInTheDocument();
    expect(screen.queryByText('Project Four')).not.toBeInTheDocument();
  });

  it('should show an empty state when no project matches', () => {
    render(<WorkSection projects={projects} />);

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search works' }), {
      target: { value: 'No matching project' },
    });

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
