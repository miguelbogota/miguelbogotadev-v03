import { cacheLife } from 'next/cache';
import { cookies } from 'next/headers';

import { ProfileSection } from '@/modules/profile';
import { Drawer, projectsService } from '@/modules/projects';
import { AppStateProvider, Container, Footer, Navigation } from '@/modules/shared';
import { SocialSection } from '@/modules/social';
import { themeService } from '@/modules/theme';
import { WorkSection } from '@/modules/work';

/** Allows the cookie-dependent home route to render as one blocking response without a loading UI. */
export const instant = false;

/** Returns the published project index from the Next.js data cache. */
async function getCachedProjects() {
  'use cache';
  cacheLife({ revalidate: 15 * 60 });

  return projectsService.getProjects();
}

/** Renders the portfolio home route from server-loaded project and theme data. */
export default async function HomePage() {
  const [projects, cookieStore] = await Promise.all([getCachedProjects(), cookies()]);
  const theme = themeService.getThemeFromCookieString(cookieStore.toString());

  return (
    <AppStateProvider value={{ projects, theme }}>
      <Navigation />

      <Container as="main">
        <ProfileSection />
        <WorkSection projects={projects} />
        <SocialSection />
      </Container>

      <Footer />
      <Drawer />
    </AppStateProvider>
  );
}
