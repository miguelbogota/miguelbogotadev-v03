import { SITE_URL } from '@/modules/shared/config/constants';

import { analyticsService, sanitizeAnalyticsPath } from './analytics.service';

describe('services / AnalyticsService', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('should strip query strings and fragments from local paths', () => {
    expect(sanitizeAnalyticsPath('/project/example?preview=true#details')).toBe('/project/example');
  });

  it('should strip query strings and fragments from absolute URLs', () => {
    expect(sanitizeAnalyticsPath('https://miguelbogota.dev/privacy?source=notice#collection')).toBe(
      '/privacy',
    );
  });

  it('should replace invalid paths with the home path', () => {
    expect(sanitizeAnalyticsPath('http://[invalid')).toBe('/');
  });

  it('should log sanitized events locally without initializing Firebase in development', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const info = vi.spyOn(console, 'info').mockImplementation(() => {});

    analyticsService.trackPageView('/project/example?preview=true#details');

    expect(info).toHaveBeenCalledWith('[analytics] page_view', {
      page_path: '/project/example',
      page_location: `${SITE_URL}/project/example`,
    });
  });
});
