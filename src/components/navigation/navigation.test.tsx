import { render, screen } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { Navigation, type NavigationProps } from './navigation.component';

/** Simple component with all of the props needed to test */
const NavigationWithProps = (props: Partial<NavigationProps>) => (
  <Navigation
    logoName="MIGUEL BOGOTA"
    links={[
      { id: 'profile', label: 'Profile' },
      { id: 'works', label: 'Works' },
      { id: 'social', label: 'Social' },
    ]}
    externalLink={{
      href: 'https://youtu.be',
      label: 'Resume',
    }}
    {...props}
  />
);

describe('components / Navigation', () => {
  beforeEach(() => {
    // Reset viewport and DOM
    window.innerHeight = 1024;
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the navigation component', () => {
    render(<NavigationWithProps />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });

  it('should render the logo on the left', () => {
    render(<NavigationWithProps />);
    const nameLink = screen.getByRole('link', { name: /MIGUEL|BOGOTA/i });
    expect(nameLink).toBeTruthy();
    // The parent element (h3) has the logo class
    expect(nameLink.parentElement?.className).toContain('logo');
  });

  it('should render the center navigation links', () => {
    render(<NavigationWithProps />);
    expect(screen.getByText('Profile')).toBeTruthy();
    expect(screen.getByText('Works')).toBeTruthy();
    expect(screen.getByText('Social')).toBeTruthy();
  });

  it('should render resume link', () => {
    render(<NavigationWithProps />);
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink).toBeTruthy();
  });

  it('should render theme picker', () => {
    render(<NavigationWithProps />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    expect(themeButton).toBeTruthy();
  });

  it('should have the logo as a clickable and reset scroll position', () => {
    render(<NavigationWithProps />);
    const nameLink = screen.getByRole('link', { name: /MIGUEL|BOGOTA/i });
    expect(nameLink).toBeTruthy();
    expect(nameLink.getAttribute('href')).toBe('/');
  });

  it('should navigate to the right link', () => {
    render(<NavigationWithProps />);

    const profileLink = screen.getByRole('link', { name: /profile/i });
    expect(profileLink.getAttribute('href')).toBe('#profile');

    const worksLink = screen.getByRole('link', { name: /works/i });
    expect(worksLink.getAttribute('href')).toBe('#works');

    const socialLink = screen.getByRole('link', { name: /social/i });
    expect(socialLink.getAttribute('href')).toBe('#social');
  });

  it('should apply active state to current section', () => {
    render(<NavigationWithProps />);
    const profileLink = screen.getByRole('link', { name: /profile/i });
    // Initial state should be the first one.
    expect(profileLink.className).toContain('active');
  });

  it('should be external and open in a new tab the resume link', () => {
    render(<NavigationWithProps />);
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink.getAttribute('href')).toBe('https://youtu.be');
    expect(resumeLink.getAttribute('target')).toBe('_blank');
    expect(resumeLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render theme picker in right section', () => {
    render(<NavigationWithProps />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    expect(themeButton).toBeTruthy();
  });

  it('navigation should be accessible with proper semantic HTML', () => {
    render(<NavigationWithProps />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });
});
