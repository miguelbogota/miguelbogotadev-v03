'use client';

import { initializeAnalytics, isSupported, logEvent } from '@firebase/analytics';
import { getApp, getApps, initializeApp } from '@firebase/app';

import { firebaseConfig } from '../config/constants';

/** Event writer returned after Firebase Analytics browser support is confirmed. */
export type FirebaseEventWriter = {
  logEvent: (name: string, parameters: Record<string, boolean | string>) => void;
};

/** Initializes the Firebase browser SDK with automatic page views disabled. */
export async function createFirebaseEventWriter(): Promise<FirebaseEventWriter | null> {
  if (!(await isSupported())) {
    return null;
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const analytics = initializeAnalytics(app, { config: { send_page_view: false } });

  return { logEvent: (name, parameters) => logEvent(analytics, name, parameters) };
}
