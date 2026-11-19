import { cookies } from 'next/headers';

import { ProfileSection } from '@/modules/profile';
import { Drawer } from '@/modules/project';
import { getCachedProjects } from '@/modules/project/services/project.service';
import { AppStateProvider, Container, Footer, Navigation } from '@/modules/shared';
import { SocialSection } from '@/modules/social';
import { themeService } from '@/modules/theme';
import { WorkSection } from '@/modules/work';

/** Allows the cookie-dependent home route to render as one blocking response without a loading UI. */
export const instant = false;

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
