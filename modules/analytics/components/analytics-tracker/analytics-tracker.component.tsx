'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { analyticsService } from '../../services/analytics.service';

/** Logs exactly one sanitized page view whenever the App Router pathname changes. */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }

    previousPathRef.current = pathname;
    analyticsService.trackPageView(pathname);
  }, [pathname]);

  return null;
}
