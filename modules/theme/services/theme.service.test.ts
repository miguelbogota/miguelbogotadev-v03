import { themeService } from './theme.service';

describe('theme / service', () => {
  beforeEach(() => {
    document.cookie = 'theme=; Max-Age=0; path=/';
  });

  it('should return the stored theme', () => {
    expect(themeService.getThemeFromCookieString('session=abc; theme=dark')).toBe('dark');
  });

  it('should use the system theme when the cookie is missing', () => {
    expect(themeService.getThemeFromCookieString('session=abc')).toBe('system');
  });

  it('should persist the selected theme for the whole site', () => {
    themeService.setThemeCookie('light');

    expect(document.cookie).toContain('theme=light');
  });
});
