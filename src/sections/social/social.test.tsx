import { render, screen } from '@/testing';
import { SocialSection } from './social.component';

describe('sections / Social', () => {
  it('should render correctly', () => {
    render(<SocialSection />);

    expect(screen.getByText('Find me Around the Web')).toBeInTheDocument();
  });
});
