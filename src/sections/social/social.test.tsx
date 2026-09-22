import { render, screen, mockState } from '@/testing';
import { SocialSection } from './social.component';

describe('sections / Social', () => {
  it('uses each social link URL as its destination', () => {
    render(<SocialSection />);
    for (const { label, url } of mockState.content.social.links) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', url);
    }
  });

  it('should render correctly', () => {
    render(<SocialSection />);

    expect(screen.getByText('Find me Around the Web')).toBeInTheDocument();
  });
});
