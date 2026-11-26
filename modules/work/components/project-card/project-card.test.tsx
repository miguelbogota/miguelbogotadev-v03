import { fireEvent, projectFixture, render, screen } from '@/testing';

import { ProjectCard } from './project-card.component';

describe('ProjectCard', () => {
  it('should render the required project thumbnail', () => {
    render(<ProjectCard project={projectFixture} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', `/project/${projectFixture.id}`);
    expect(screen.getByRole('img', { name: projectFixture.thumbnail.alt })).toHaveAttribute(
      'src',
      projectFixture.thumbnail.src,
    );
  });

  it('should show generated artwork while the required thumbnail loads', () => {
    const { container } = render(<ProjectCard project={projectFixture} />);
    const thumbnail = screen.getByRole('img', { name: projectFixture.thumbnail.alt });

    expect(container.querySelector('.project-artwork')).toBeInTheDocument();

    fireEvent.load(thumbnail);

    expect(container.querySelector('.project-artwork')).not.toBeInTheDocument();
  });

  it('should recognize a thumbnail that completed before its load handler was attached', () => {
    const project = {
      ...projectFixture,
      thumbnail: {
        ...projectFixture.thumbnail,
        src: 'https://example.com/browser-cached-thumbnail.png',
      },
    };
    const complete = vi
      .spyOn(HTMLImageElement.prototype, 'complete', 'get')
      .mockReturnValue(true);
    const naturalWidth = vi
      .spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get')
      .mockReturnValue(1200);

    try {
      const { container } = render(<ProjectCard project={project} />);

      expect(container.querySelector('.project-artwork')).not.toBeInTheDocument();
    } finally {
      complete.mockRestore();
      naturalWidth.mockRestore();
    }
  });

  it('should remember a loaded thumbnail when its card mounts again', () => {
    const project = {
      ...projectFixture,
      thumbnail: {
        ...projectFixture.thumbnail,
        src: 'https://example.com/remembered-thumbnail.png',
      },
    };
    const firstRender = render(<ProjectCard project={project} />);

    fireEvent.load(screen.getByRole('img', { name: project.thumbnail.alt }));
    firstRender.unmount();

    const secondRender = render(<ProjectCard project={project} />);

    expect(secondRender.container.querySelector('.project-artwork')).not.toBeInTheDocument();
  });

  it('should keep generated artwork when the required thumbnail fails', () => {
    const { container } = render(<ProjectCard project={projectFixture} />);
    const thumbnail = screen.getByRole('img', { name: projectFixture.thumbnail.alt });

    fireEvent.error(thumbnail);

    expect(container.querySelector('.project-artwork')).toBeInTheDocument();
  });

  it('should preserve modified clicks for native browser navigation', () => {
    render(<ProjectCard project={projectFixture} />);

    const projectLink = screen.getByRole('link');

    expect(fireEvent.click(projectLink, { ctrlKey: true })).toBe(true);
    expect(fireEvent.click(projectLink, { metaKey: true })).toBe(true);
  });
});
