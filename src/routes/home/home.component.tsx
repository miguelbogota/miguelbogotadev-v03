import { Container } from '@/components/container';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Drawer } from '@/components/drawer';

import { ProfileSection } from '@/sections/profile';
import { WorkSection } from '@/sections/work';
import { SocialSection } from '@/sections/social';

/** Home route component. */
export function HomeRoute() {
  return (
    <>
      <Navigation />

      <Container as="main">
        <ProfileSection />
        <WorkSection />
        <SocialSection />
      </Container>

      <Footer />

      <Drawer />
    </>
  );
}
