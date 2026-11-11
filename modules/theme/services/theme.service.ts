import type { Theme } from '../types/types';

/** Cookie name used to persist the selected theme. */
const THEME_COOKIE_NAME = 'theme';

/** Provides theme cookie reads and writes through one shared module instance. */
class ThemeService {
  /**
   * Reads the theme from an HTTP `Cookie` header value.
   *
   * @param cookieString - The complete `Cookie` header value.
   * @returns The stored theme, or `system` when the theme cookie is missing.
   */
  getThemeFromCookieString(cookieString?: string | null): Theme {
    if (!cookieString) return 'system';

    const themeCookie = cookieString
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${THEME_COOKIE_NAME}=`));
    const value = themeCookie?.slice(THEME_COOKIE_NAME.length + 1);

    return (value as Theme | undefined) ?? 'system';
  }

  /**
   * Persists the selected theme in a browser cookie for the whole site.
   * The method does nothing when the DOM is unavailable.
   *
   * @param theme - The theme to persist.
   */
  setThemeCookie(theme: Theme): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}; path=/; samesite=lax`;
  }
}

/**
 * Shared theme module instance used by layouts and the theme picker.
 *
 * @example
 * ```tsx
 * import { themeService } from '@/modules/theme';
 *
 * themeService.setThemeCookie('dark');
 * ```
 */
export const themeService = new ThemeService();
