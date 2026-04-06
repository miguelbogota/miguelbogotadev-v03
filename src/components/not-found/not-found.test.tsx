import { render, screen } from '@/testing';
import { NotFound } from '@/components/not-found';
import { mockState } from '@/testing';

describe('components / NotFound', () => {
  it('should render not found component with content from API', () => {
    render(<NotFound />);

    expect(screen.getByText(mockState.content.notFound.title)).toBeInTheDocument();
    expect(screen.getByText(mockState.content.notFound.description)).toBeInTheDocument();
    expect(screen.getByText(mockState.content.notFound.goHomeButton)).toBeInTheDocument();
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
