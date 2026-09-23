import { render, screen } from '@/testing';
import { SocialSection } from './social.component';

describe('sections / Social', () => {
  it('uses each social link URL as its destination', () => {
    render(<SocialSection />);
    for (const { label, url } of [
      { label: 'Email link', url: 'mailto:contact@miguelbogota.dev' },
      { label: 'GitHub profile link', url: 'https://github.com/miguelbogota' },
      { label: 'LinkedIn profile link', url: 'https://linkedin.com/in/miguelbogota' },
      { label: 'Instagram profile link', url: 'https://instagram.com/migue_bogota' },
    ]) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', url);
    }
  });

  it('should render correctly', () => {
    render(<SocialSection />);

    expect(screen.getByText('Find me Around the Web')).toBeInTheDocument();
  });
});
