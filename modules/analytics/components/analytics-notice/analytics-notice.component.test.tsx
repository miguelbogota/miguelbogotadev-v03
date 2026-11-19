import { fireEvent } from '@testing-library/react';

import { render, screen } from '@/testing';

import { ANALYTICS_NOTICE_STORAGE_KEY } from '../../config/constants';
import { AnalyticsNotice } from './analytics-notice.component';

/** In-memory storage used because Node 25 exposes an incomplete test `localStorage`. */
const storage = new Map<string, string>();

describe('components / AnalyticsNotice', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        clear: () => storage.clear(),
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    });
    window.localStorage.clear();
  });

  it('should explain analytics and link to privacy details', () => {
    render(<AnalyticsNotice />);

    expect(screen.getByLabelText('Analytics notice')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy details' })).toHaveAttribute(
      'href',
      '/privacy',
    );
  });

  it('should hide after the informational notice is acknowledged', () => {
    render(<AnalyticsNotice />);

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(screen.queryByLabelText('Analytics notice')).not.toBeInTheDocument();
    expect(window.localStorage.getItem(ANALYTICS_NOTICE_STORAGE_KEY)).toBe('true');
  });

  it('should remain hidden after it has already been acknowledged', () => {
    window.localStorage.setItem(ANALYTICS_NOTICE_STORAGE_KEY, 'true');

    render(<AnalyticsNotice />);

    expect(screen.queryByLabelText('Analytics notice')).not.toBeInTheDocument();
  });

  it('should remain usable when browser storage cannot be read', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is unavailable.', 'SecurityError');
    });

    render(<AnalyticsNotice />);

    expect(screen.getByLabelText('Analytics notice')).toBeInTheDocument();
  });

  it('should dismiss in memory when browser storage cannot be written', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage is unavailable.', 'SecurityError');
    });

    render(<AnalyticsNotice />);
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(screen.queryByLabelText('Analytics notice')).not.toBeInTheDocument();
  });
});
