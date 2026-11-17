import { analyticsService } from '@/modules/analytics/services/analytics.service';
import { fireEvent, render, screen } from '@/testing';

import { SearchBar } from './search-bar.component';

describe('sections / SearchBar', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render an accessible search field with default wording', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    const input = screen.getByRole('searchbox', { name: 'Search works' });

    expect(input).toHaveAttribute('id', 'work-search-input');
    expect(input).toHaveAttribute('placeholder', 'Search projects…');
    expect(input).toHaveValue('');
  });

  it('should use the supplied id, label, placeholder, and value', () => {
    const { container } = render(
      <SearchBar
        id="portfolio-search"
        label="Find a project"
        placeholder="Type a keyword"
        value="React"
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByRole('searchbox', { name: 'Find a project' });

    expect(container.querySelector('#portfolio-search')).toHaveClass('search-bar');
    expect(input).toHaveAttribute('id', 'portfolio-search-input');
    expect(input).toHaveAttribute('placeholder', 'Type a keyword');
    expect(input).toHaveValue('React');
  });

  it('should report changes and display the value supplied by its parent', () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('searchbox', { name: 'Search works' });

    fireEvent.change(input, { target: { value: 'Blender' } });

    expect(onChange).toHaveBeenCalledExactlyOnceWith('Blender');

    rerender(<SearchBar value="Blender" onChange={onChange} />);
    expect(input).toHaveValue('Blender');
  });

  it('should report search usage once without forwarding entered text', () => {
    const trackSearchUse = vi
      .spyOn(analyticsService, 'trackSearchUse')
      .mockImplementation(() => {});
    const { rerender } = render(<SearchBar value="" onChange={vi.fn()} />);
    const input = screen.getByRole('searchbox', { name: 'Search works' });

    fireEvent.change(input, { target: { value: 'private search words' } });
    rerender(<SearchBar value="private search words" onChange={vi.fn()} />);
    fireEvent.change(input, { target: { value: 'more private search words' } });

    expect(trackSearchUse).toHaveBeenCalledOnce();
    expect(trackSearchUse).toHaveBeenCalledWith();
  });
});
