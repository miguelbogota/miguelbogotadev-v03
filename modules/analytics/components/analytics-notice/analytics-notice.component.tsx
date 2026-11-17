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
    setIsVisible(window.localStorage.getItem(ANALYTICS_NOTICE_STORAGE_KEY) !== 'true');
  }, []);

  /** Records that the visitor has seen the notice; it does not represent consent. */
  const handleDismiss = () => {
    window.localStorage.setItem(ANALYTICS_NOTICE_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="analytics-notice" aria-label="Analytics notice">
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
    </aside>
  );
}
