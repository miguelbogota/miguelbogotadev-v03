import { Container } from '@/components/container';
import { Drawer } from '@/components/drawer';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { ProfileSection } from '@/sections/profile';
import { SocialSection } from '@/sections/social';
import { WorkSection } from '@/sections/work';

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
