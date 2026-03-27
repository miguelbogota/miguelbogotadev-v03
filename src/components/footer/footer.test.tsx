import { render } from '@testing-library/react';
import { Footer } from './footer.component';

describe('component / Footer', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Footer text="Test" />);
    expect(getByText('Test')).toBeInTheDocument();
  });
});
