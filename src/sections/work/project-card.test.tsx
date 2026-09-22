import { render, screen, mockState } from '@/testing';
import { ProjectCard } from './project-card.component';

describe('ProjectCard image fallback', () => {
  it('renders permanent artwork and a project link without screenshots', () => {
    const project = { ...mockState.projects[0]!, images: [] };
    const { container } = render(<ProjectCard project={project} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', `/project/${project.id}`);
    expect(container.querySelector('.project-artwork')).toBeInTheDocument();
    expect(container.querySelector('.media img')).not.toBeInTheDocument();
  });

  it('keeps the project image when one is provided', () => {
    const project = mockState.projects[0]!;
    const { container } = render(<ProjectCard project={project} />);

    expect(screen.getByAltText(project.images[0]!.alt)).toHaveAttribute(
      'src',
      project.images[0]!.src,
    );

    expect(container.querySelector('.project-artwork')).not.toBeInTheDocument();
    expect(container.querySelector('.media img')).toBeInTheDocument();
  });
});
