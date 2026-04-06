/** SameSite cookie policy options. */
type SameSite = 'Strict' | 'Lax' | 'None';

/** Cookie options interface. */
export interface CookieOptions {
  /** Number of days until expiration */
  days?: number;
  /** Cookie path (default: "/") */
  path?: string;
  /** Cookie domain */
  domain?: string;
  /** Use secure flag (HTTPS only) */
  secure?: boolean;
  /** SameSite policy */
  sameSite?: SameSite;
}

/**
 * Utility for managing browser cookies.
 * Note: Does NOT work with httpOnly cookies.
 */
export const cookies = {
  /**
   * Get a cookie value by name.
   * @param name Cookie name
   * @returns The cookie value or null if not found
   */
  get(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie ? document.cookie.split('; ') : [];

    for (const c of cookies) {
      const [key, ...rest] = c.split('=');
      if (decodeURIComponent(key ?? '') === name) {
        return decodeURIComponent(rest.join('='));
      }
    }

    return null;
  },

  /**
   * Get all cookies as an object.
   * @returns Record of all cookies
   */
  getAll(): Record<string, string> {
    if (typeof document === 'undefined') return {};

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const result: Record<string, string> = {};

    for (const c of cookies) {
      const [key, ...rest] = c.split('=');
      result[decodeURIComponent(key ?? '')] = decodeURIComponent(rest.join('='));
    }

    return result;
  },

  /**
   * Set a cookie.
   * Does NOT overwrite other cookies.
   *
   * @param name Cookie name
   * @param value Cookie value
   * @param options Cookie options
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document === 'undefined') return;

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.days !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
      cookieStr += `; expires=${date.toUTCString()}`;
    }

    cookieStr += `; path=${options.path ?? '/'}`;

    if (options.domain) cookieStr += `; domain=${options.domain}`;
    if (options.secure) cookieStr += `; secure`;
    if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

    document.cookie = cookieStr;
  },

  /**
   * Remove a specific cookie.
   * Requires matching path/domain if they were set.
   *
   * @param name Cookie name
   * @param options Cookie options (path/domain must match original)
   */
  remove(name: string, options: CookieOptions = {}): void {
    this.set(name, '', {
      ...options,
      days: -1,
    });
  },

  /**
   * Clear all accessible cookies (best effort).
   * Note: May not remove cookies with different path/domain.
   */
  clear(): void {
    if (typeof document === 'undefined') return;

    const all = this.getAll();

    for (const name in all) {
      this.remove(name);
      this.remove(name, { path: '/' });
    }
  },
};
