import './privacy.styles.scss';

import { type Metadata } from 'next';
import Link from 'next/link';

import { seoService } from '@/modules/seo';
import { Container, Footer } from '@/modules/shared';

/** Search and social metadata for the privacy information page. */
export const metadata: Metadata = seoService.getPrivacyMetadata();

/** Explains the limited browser storage, analytics, and diagnostics used by the portfolio. */
export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <Container as="main" maxWidth="800px">
        <Link href="/" scroll={false} aria-label="Return to the portfolio">
          ← Back to the portfolio
        </Link>

        <h1>Privacy</h1>
        <p>
          This portfolio collects a small amount of pseudonymous usage data to understand whether
          the site works well and which parts visitors use. It does not ask for an account or attach
          analytics to a known identity.
        </p>

        <h2>Browser storage</h2>
        <p>
          A theme cookie stores the selected light, dark, or system appearance. Local storage
          records that the analytics notice has been seen so it does not appear on every visit.
          Firebase Analytics may use its own browser identifiers to distinguish visits and sessions.
        </p>

        <h2>Analytics and diagnostics</h2>
        <p>
          Firebase Analytics records sanitized page paths, project opens, navigation destinations,
          link categories, search-bar usage, theme choices, and fixed exception categories. Server
          failures may also appear in Firebase App Hosting logs.
        </p>
        <p>
          Search text, page text, raw error messages and stacks, full outbound URLs, user IDs, exact
          coordinates, and other user-entered values are not sent through custom analytics events.
          Query strings and URL fragments are removed from recorded paths.
        </p>

        <h2>Notice</h2>
        <p>
          The on-site notice is informational rather than an accept-or-reject control. Selecting
          <strong> OK</strong> only dismisses that notice.
        </p>

        <h2>Retention and service providers</h2>
        <p>
          Analytics data is processed by Google through Firebase and retained according to the
          linked GA4 property settings. Hosting and server logs are processed by Firebase App
          Hosting and are kept only for operational diagnostics under the configured project
          retention settings.
        </p>

        <h2>Your browser controls</h2>
        <p>
          You can remove the theme cookie, the notice preference, and analytics identifiers through
          your browser’s site-data controls. Browser privacy protections, content blockers, and
          disabled JavaScript may also prevent Analytics from running; the portfolio content remains
          available without it.
        </p>

        <h2>Changes</h2>
        <p>
          This page will be updated when the portfolio starts collecting a different category of
          information or changes its analytics providers. The current version describes only the
          behavior implemented in this repository.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this information can be sent to{' '}
          <a href="mailto:contact@miguelbogota.dev">contact@miguelbogota.dev</a>.
        </p>
      </Container>
      <Footer />
    </div>
  );
}
