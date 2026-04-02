import { render } from '@/testing';
import { Footer } from './footer.component';

describe('component / Footer', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Designed & Built by Miguel Bogota')).toBeInTheDocument();
  });
});
