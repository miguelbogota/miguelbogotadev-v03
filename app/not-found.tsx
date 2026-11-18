import { ErrorPage } from '@/modules/shared';

/** Renders the application-wide missing-page state. */
export default function NotFound() {
  return (
    <ErrorPage
      title="This page could not be found"
      message="The page may have moved, or the address may be incorrect."
    />
  );
}
