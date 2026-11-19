import { fireEvent, projectFixture, render, screen } from '@/testing';

import { ProjectCard } from './project-card.component';

describe('ProjectCard image fallback', () => {
  it('renders permanent artwork and a project link without screenshots', () => {
    const project = { ...projectFixture, images: [] };
    const { container } = render(<ProjectCard project={project} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', `/project/${project.id}`);
    expect(container.querySelector('.project-artwork')).toBeInTheDocument();
    expect(container.querySelector('.media img')).not.toBeInTheDocument();
  });

  it('keeps the project image when one is provided', () => {
    const project = projectFixture;
    const { container } = render(<ProjectCard project={project} />);
    const heroImage = project.images[0];

    if (!heroImage) {
      throw new Error('The project fixture must include a hero image.');
    }

    expect(screen.getByAltText(heroImage.alt)).toHaveAttribute('src', heroImage.src);

    expect(container.querySelector('.project-artwork')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: project.images[0]?.alt })).toBeInTheDocument();
  });

  it('should preserve modified clicks for native browser navigation', () => {
    render(<ProjectCard project={projectFixture} />);

    const projectLink = screen.getByRole('link');

    expect(fireEvent.click(projectLink, { ctrlKey: true })).toBe(true);
    expect(fireEvent.click(projectLink, { metaKey: true })).toBe(true);
  });
});
