import { SITE_URL } from '@/modules/shared';

import { requiredFirebaseConfig } from '../config/constants';

/** Lazily initialized Firebase event writer. */
type AnalyticsClient = {
  logEvent: (name: string, parameters: Record<string, boolean | string>) => void;
};

/**
 * Removes query strings and fragments before a path can enter Analytics.
 *
 * @example
 * ```ts
 * sanitizeAnalyticsPath('/project/example?preview=true#details');
 * // '/project/example'
 * ```
 *
 * @param value - Local or absolute navigation value.
 * @returns A leading-slash pathname with no query string or fragment.
 */
export function sanitizeAnalyticsPath(value: string): string {
  try {
    return new URL(value, SITE_URL).pathname;
  } catch {
    return '/';
  }
}

/** Logs a small allowlist of pseudonymous portfolio events through Firebase Analytics. */
class AnalyticsService {
  private analyticsPromise: Promise<AnalyticsClient | null> | null = null;

  /** Logs one manually controlled page view for a client navigation. */
  trackPageView(path: string): void {
    const pagePath = sanitizeAnalyticsPath(path);

    this.log('page_view', {
      page_path: pagePath,
      page_location: new URL(pagePath, SITE_URL).toString(),
    });
  }

  /** Logs that a visitor opened a published project. */
  trackProject(projectId: string): void {
    this.log('select_content', { content_type: 'project', item_id: projectId });
  }

  /** Logs an allowlisted outbound-link category without collecting its URL or text. */
  trackLink(category: string, linkId: string): void {
    this.log('link_click', { link_category: category, link_id: linkId });
  }

  /** Logs navigation to a known portfolio section without collecting DOM text. */
  trackNavigation(destination: string): void {
    this.log('navigation', { destination });
  }

  /** Logs search usage without collecting the entered query. */
  trackSearchUse(): void {
    this.log('search_use', { search_surface: 'projects' });
  }

  /** Logs a selected theme value. */
  trackTheme(theme: string): void {
    this.log('theme_change', { theme });
  }

  /** Logs a sanitized exception category without an error message, stack, or user value. */
  trackException(area: string, fatal = false): void {
    this.log('exception', { description: area, fatal });
  }

  /**
   * Sends an allowlisted event after browser support and Firebase configuration are confirmed.
   *
   * @param name - Fixed Analytics event name.
   * @param parameters - Sanitized event parameters owned by this service.
   */
  private log(name: string, parameters: Record<string, boolean | string>): void {
    if (process.env.NODE_ENV !== 'production') {
      if (process.env.NODE_ENV === 'development') {
        // Development intentionally exposes sanitized events without sending them to Firebase.
        // eslint-disable-next-line no-console
        console.info(`[analytics] ${name}`, parameters);
      }

      return;
    }

    void this.getAnalytics()
      .then((client) => {
        if (client) {
          client.logEvent(name, parameters);
        }
      })
      .catch(() => undefined);
  }

  /** Returns the single supported browser Analytics instance, or `null` when unavailable. */
  private getAnalytics(): Promise<AnalyticsClient | null> {
    if (this.analyticsPromise) {
      return this.analyticsPromise;
    }

    this.analyticsPromise = this.initialize();

    return this.analyticsPromise;
  }

  /** Initializes Firebase Analytics without its automatic page-view event. */
  private async initialize(): Promise<AnalyticsClient | null> {
    if (typeof window === 'undefined' || requiredFirebaseConfig.some((value) => !value)) {
      return null;
    }

    const { createFirebaseEventWriter } = await import('./firebase.client');

    return createFirebaseEventWriter();
  }
}

/** Shared browser Analytics service. */
export const analyticsService = new AnalyticsService();
