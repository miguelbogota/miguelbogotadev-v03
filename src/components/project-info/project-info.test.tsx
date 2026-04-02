import { render, screen } from '@/testing';
import { ProjectInfo } from './project-info.component';
import { mockState } from '@/testing';

describe('ProjectInfo', () => {
  it('should render project name', () => {
    const mockProject = mockState.projects[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.displayName)).toBeInTheDocument();
  });

  it('should render project summary', () => {
    const mockProject = mockState.projects[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.summary)).toBeInTheDocument();
  });

  it('should render project industry and year', () => {
    const mockProject = mockState.projects[0]!;
    const year = mockProject.startedAt.split('-')[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(`${mockProject.industry} — ${year}`)).toBeInTheDocument();
  });

  it('should render project hero image', () => {
    const mockProject = mockState.projects[0]!;
    const heroImage = mockProject.images[0]!;

    render(<ProjectInfo project={mockProject} />);

    const image = screen.getByAltText(heroImage.alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', heroImage.src);
  });
});
