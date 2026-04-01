import { type Content } from '../types/content';
import { type Project } from '../types/project';
import type { ThemeType } from '../types/theme';
import { RootRoute } from './root';

import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { ProfileSection } from '../sections/profile';
import { SocialSection } from '../sections/social';
import { WorkSection } from '../sections/work';

/** Home Route Props */
export type HomeProps = {
  content: Content;
  projects: Project[];
  theme: ThemeType;
};

/** Home Route */
export const HomeRoute = ({ content, projects, theme }: HomeProps) =>
  RootRoute({
    theme,
    content,
    projects,
    children: /*html */ `
      ${Navigation(content.navigation)}

      <main class="container">
        ${ProfileSection(content.profile)}
        ${WorkSection({ ...content.work, projects })}
        ${SocialSection(content.social)}
      </main>
      
      ${Footer(content.footer)}
    `,
  });
