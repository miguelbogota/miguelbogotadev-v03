# Analytics module

Owns privacy-limited Firebase Analytics and the informational collection notice.

## Public API

```ts
import { AnalyticsNotice, AnalyticsTracker, analyticsService } from '@/modules/analytics';
```

## Privacy boundary

- Analytics initializes only in supported browsers with complete public Firebase configuration.
- Development never calls Firebase; sanitized events are printed to the console with an `[analytics]` prefix. Tests stay silent.
- Automatic Firebase page views are disabled; `AnalyticsTracker` logs one sanitized page view per pathname.
- Query strings and fragments are removed from paths.
- Events use fixed names and allowlisted parameters.
- Search text, DOM text, raw errors and stacks, complete outbound URLs, user IDs, exact coordinates, and user-entered values are never sent.
- Exception events contain only a fixed application area and fatal flag. App Hosting logs provide server diagnostics.
- The notice is informational and has one **OK** button; analytics does not wait for acceptance.

In the linked GA4 web stream, keep Enhanced Measurement disabled for outbound clicks, site search, and form interactions. Those automatic events can include URLs or user-entered values that intentionally fall outside this module's allowlist. Automatic Firebase page views are disabled in code.

## Files

- `index.ts`: public components, service, and event types.
- `config/constants.ts`: Firebase public environment mapping and notice storage key.
- `services/analytics.service.ts`: browser initialization, sanitization, and typed event methods.
- `services/firebase.client.ts`: production-only Firebase SDK adapter loaded on demand.
- `components/analytics-tracker/*`: one page view per pathname.
- `components/analytics-notice/*`: informational analytics notice and dismissal state.

## Environment

Provide these values through local or Firebase App Hosting environment configuration:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

These values identify the Firebase web app and are expected to be visible in browser bundles. Do not commit environment-specific values.
