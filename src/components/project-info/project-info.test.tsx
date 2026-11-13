import { projectsService } from '@/modules/projects';
import { RequestError } from '@/modules/shared';
import { act, projectFixture, render, screen } from '@/testing';

import { ProjectInfo } from './project-info.component';

vi.mock('@/modules/projects', () => ({
  projectsService: {
    getProjectContent: vi.fn(),
  },
}));

const getProjectContentMock = vi.mocked(projectsService.getProjectContent);

describe('ProjectInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getProjectContentMock.mockReturnValue(new Promise(() => {}));
  });

  it('renders project links using their supplied labels, icons, and URLs', () => {
    const project = {
      ...projectFixture,
      links: [{ label: 'Documentation', icon: 'bx bx-book', url: 'https://example.com/docs' }],
    };

    render(<ProjectInfo project={project} />);

    const link = screen.getByRole('link', {
      name: `${project.displayName}: Documentation (opens in a new tab)`,
    });

    expect(link).toHaveAttribute('href', 'https://example.com/docs');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link.querySelector('i')).toHaveClass('bx', 'bx-book');
  });

  it('omits project links when none are provided', () => {
    render(<ProjectInfo project={{ ...projectFixture, links: [] }} />);
    expect(document.querySelector('.project-info .header .links')).not.toBeInTheDocument();
  });

  it('should render project name', () => {
    const mockProject = projectFixture;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.displayName)).toBeInTheDocument();
  });

  it('should render project summary', () => {
    const mockProject = projectFixture;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.summary)).toBeInTheDocument();
  });

  it('should render project date and role', () => {
    const mockProject = projectFixture;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.startedAt)).toBeInTheDocument();
    expect(screen.getByText(mockProject.role)).toBeInTheDocument();
  });

  it('should render project industry and tags', () => {
    const mockProject = projectFixture;

    render(<ProjectInfo project={mockProject} />);

    expect(screen.getByText(mockProject.industry)).toBeInTheDocument();

    // Check that tags container exists and has content
    const tagsContainer = document.querySelector('.tags');

    expect(tagsContainer).toBeInTheDocument();
    expect(tagsContainer?.textContent).toContain(mockProject.tags[0]);
  });

  it('should show skeletons only where project content will appear', () => {
    getProjectContentMock.mockReturnValue(new Promise(() => {}));

    render(<ProjectInfo project={projectFixture} />);

    expect(screen.getByRole('status', { name: 'Loading project details' })).toBeInTheDocument();
    expect(screen.getByText(projectFixture.displayName)).toBeInTheDocument();
    expect(screen.getByText(projectFixture.summary)).toBeInTheDocument();
  });

  it('should render the Markdown project content without its frontmatter', async () => {
    const mockProject = projectFixture;

    getProjectContentMock.mockResolvedValue(
      '## Architecture\n\nBuilt with **server-driven UI**.\n\n- Go backend\n- React frontend',
    );

    render(<ProjectInfo project={mockProject} />);

    expect(getProjectContentMock).toHaveBeenCalledWith({ id: mockProject.id });
    await act(async () => {
      await getProjectContentMock.mock.results[0]?.value;
    });

    expect(screen.getByRole('heading', { name: 'Architecture' })).toBeInTheDocument();
    expect(screen.getByText('server-driven UI')).toHaveProperty('tagName', 'STRONG');
    expect(screen.getByText('Go backend')).toBeInTheDocument();
    expect(screen.queryByText('id:')).not.toBeInTheDocument();
  });

  it('should render a not-found project-content error', async () => {
    getProjectContentMock.mockRejectedValue(
      new RequestError({ code: 404, message: 'Project content was not found.' }),
    );

    render(<ProjectInfo project={projectFixture} />);
    await act(async () => {
      await getProjectContentMock.mock.results[0]?.value.catch(() => undefined);
    });

    expect(screen.getByText('Project details were not found.')).toBeInTheDocument();
  });

  it('should render an internal project-content error', async () => {
    getProjectContentMock.mockRejectedValue(
      new RequestError({ code: 500, message: 'Project content could not be loaded.' }),
    );

    render(<ProjectInfo project={projectFixture} />);
    await act(async () => {
      await getProjectContentMock.mock.results[0]?.value.catch(() => undefined);
    });

    expect(screen.getByText('Project details are temporarily unavailable.')).toBeInTheDocument();
  });

  it('should render project images', () => {
    const mockProject = projectFixture;
    const heroImage = mockProject.images[0];

    if (!heroImage) {
      throw new Error('The project fixture must include a hero image.');
    }

    render(<ProjectInfo project={mockProject} />);

    const [gallery, thumbnail] = screen.getAllByAltText(heroImage.alt);

    expect(gallery).toBeInTheDocument();
    expect(gallery).toHaveAttribute('src', heroImage.src);

    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', heroImage.src);
  });

  it('renders project details without an image gallery when no screenshots exist', () => {
    const project = { ...projectFixture, images: [] };

    render(<ProjectInfo project={project} />);

    expect(screen.getByText(project.displayName)).toBeInTheDocument();
    expect(document.querySelector('.images')).not.toBeInTheDocument();
  });

  it('should render action buttons when provided', () => {
    const mockProject = projectFixture;

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
