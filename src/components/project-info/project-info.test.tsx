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

  it('should render project date and role', () => {
    const mockProject = mockState.projects[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.startedAt)).toBeInTheDocument();
    expect(screen.getByText(mockProject.role)).toBeInTheDocument();
  });

  it('should render project industry and tags', () => {
    const mockProject = mockState.projects[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.industry)).toBeInTheDocument();

    // Check that tags container exists and has content
    const tagsContainer = document.querySelector('.tags');
    expect(tagsContainer).toBeInTheDocument();
    expect(tagsContainer?.textContent).toContain(mockProject.tags[0]);
  });

  it('should render challenge section', () => {
    const mockProject = mockState.projects[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.challenge.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.challenge.description)).toBeInTheDocument();
  });

  it('should render solution section', () => {
    const mockProject = mockState.projects[0]!;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.solution.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.solution.description)).toBeInTheDocument();
  });

  it('should render project images', () => {
    const mockProject = mockState.projects[0]!;
    const heroImage = mockProject.images[0]!;

    render(<ProjectInfo project={mockProject} />);

    const image = screen.getByAltText(heroImage.alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', heroImage.src);
  });

  it('should render action buttons when provided', () => {
    const mockProject = mockState.projects[0]!;

    render(
      <ProjectInfo
        project={mockProject}
        backButton={<button>Back</button>}
        closeButton={<button>Close</button>}
      />,
    );

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
