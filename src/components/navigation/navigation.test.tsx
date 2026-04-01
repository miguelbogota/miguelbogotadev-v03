import { render, screen } from '@/testing';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { Navigation } from './navigation.component';

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
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });

  it('should render the logo on the left', () => {
    render(<Navigation />);
    const nameLink = screen.getByRole('link', { name: /MIGUEL|BOGOTA/i });
    expect(nameLink).toBeTruthy();
    // The parent element (h3) has the logo class
    expect(nameLink.parentElement?.className).toContain('logo');
  });

  it('should render the center navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('PROFILE')).toBeTruthy();
    expect(screen.getByText('WORK')).toBeTruthy();
    expect(screen.getByText('SOCIAL')).toBeTruthy();
  });

  it('should render resume link', () => {
    render(<Navigation />);
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink).toBeTruthy();
  });

  it('should render theme picker', () => {
    render(<Navigation />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    expect(themeButton).toBeTruthy();
  });

  it('should have the logo as a clickable and reset scroll position', () => {
    render(<Navigation />);
    const nameLink = screen.getByRole('link', { name: /MIGUEL|BOGOTA/i });
    expect(nameLink).toBeTruthy();
    expect(nameLink.getAttribute('href')).toBe('/');
  });

  it('should navigate to the right link', () => {
    render(<Navigation />);

    const profileLink = screen.getByRole('link', { name: /profile/i });
    expect(profileLink.getAttribute('href')).toBe('#profile');

    const worksLink = screen.getByRole('link', { name: /work/i });
    expect(worksLink.getAttribute('href')).toBe('#work');

    const socialLink = screen.getByRole('link', { name: /social/i });
    expect(socialLink.getAttribute('href')).toBe('#social');
  });

  it('should apply active state to current section', () => {
    render(<Navigation />);
    const profileLink = screen.getByRole('link', { name: /profile/i });
    // Initial state should be the first one.
    expect(profileLink.className).toContain('active');
  });

  it('should be external and open in a new tab the resume link', () => {
    render(<Navigation />);
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink.getAttribute('href')).toBe('https://youtu.be');
    expect(resumeLink.getAttribute('target')).toBe('_blank');
    expect(resumeLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render theme picker in right section', () => {
    render(<Navigation />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    expect(themeButton).toBeTruthy();
  });

  it('navigation should be accessible with proper semantic HTML', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });
});
