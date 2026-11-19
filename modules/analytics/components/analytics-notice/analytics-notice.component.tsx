'use client';

import './analytics-notice.styles.scss';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ANALYTICS_NOTICE_STORAGE_KEY } from '../../config/constants';
import { analyticsService } from '../../services/analytics.service';

/** Displays a dismissible informational notice about pseudonymous analytics collection. */
export function AnalyticsNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(window.localStorage.getItem(ANALYTICS_NOTICE_STORAGE_KEY) !== 'true');
    } catch {
      setIsVisible(true);
    }
  }, []);

  /** Records that the visitor has seen the notice; it does not represent consent. */
  const handleDismiss = () => {
    try {
      window.localStorage.setItem(ANALYTICS_NOTICE_STORAGE_KEY, 'true');
    } catch {
      // Storage is optional; the notice can still be dismissed for the current render.
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="analytics-notice"
      aria-label="Analytics notice"
      role="status"
      data-inert-exempt
    >
      <div>
        <p>
          This site uses pseudonymous analytics to understand navigation, interactions, and basic
          errors. Search text and personal information are not collected.{' '}
          <Link href="/privacy" onClick={() => analyticsService.trackLink('privacy', 'notice')}>
            Privacy details
          </Link>
        </p>
        <button type="button" onClick={handleDismiss}>
          OK
        </button>
      </div>
    </aside>
  );
}
