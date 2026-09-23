import { render, screen } from '@/testing';
import { NotFound } from '@/components/not-found';

describe('components / NotFound', () => {
  it('should render the not found wording', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText("The page you're looking for doesn't exist.")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go Home' })).toHaveAttribute('href', '/');
  });

  it('should have proper structure and classes', () => {
    render(<NotFound />);

    const container = document.querySelector('.not-found');
    const content = container?.querySelector('div');
    const title = content?.querySelector('h1');
    const description = content?.querySelector('p');
    const link = content?.querySelector('a');

    expect(container).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
