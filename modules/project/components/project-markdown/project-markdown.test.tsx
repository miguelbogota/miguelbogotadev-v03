import { render, screen } from '@/testing';

import { ProjectMarkdown } from './project-markdown.component';

describe('ProjectMarkdown', () => {
  it('should render inline project images with accessible reserved space', () => {
    render(
      <ProjectMarkdown markdown="![Seller dashboard](https://example.com/dashboard.png)" />,
    );

    const image = screen.getByRole('img', { name: 'Seller dashboard' });

    expect(image).toHaveAttribute('src', 'https://example.com/dashboard.png');
    expect(image).toHaveAttribute('width', '1200');
    expect(image).toHaveAttribute('height', '800');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should preserve heading hierarchy inside an initiative disclosure', () => {
    render(<ProjectMarkdown markdown="## Challenge" headingOffset={2} />);

    expect(screen.getByRole('heading', { level: 4, name: 'Challenge' })).toBeInTheDocument();
  });
});
