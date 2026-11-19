import { usePathname } from 'next/navigation';

import { render } from '@/testing';

import { analyticsService } from '../../services/analytics.service';
import { AnalyticsTracker } from './analytics-tracker.component';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));
vi.mock('../../services/analytics.service', () => ({
  analyticsService: { trackPageView: vi.fn() },
}));

describe('components / AnalyticsTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('should log each distinct pathname once', () => {
    const { rerender } = render(<AnalyticsTracker />);

    rerender(<AnalyticsTracker />);
    vi.mocked(usePathname).mockReturnValue('/privacy');
    rerender(<AnalyticsTracker />);

    expect(analyticsService.trackPageView).toHaveBeenNthCalledWith(1, '/');
    expect(analyticsService.trackPageView).toHaveBeenNthCalledWith(2, '/privacy');
    expect(analyticsService.trackPageView).toHaveBeenCalledTimes(2);
  });
});
