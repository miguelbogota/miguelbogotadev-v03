import { type Content } from '../types/content';
import { type Project } from '../types/project';
import type { ThemeType } from '../types/theme';
import { RootRoute } from './root';

import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

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
    children: /*html */ `
      ${Navigation(content.navigation)}

      <main class="container">
          <section id="profile" style="min-height: 100vh">
            <h2>Profile</h2>
          </section>

          <section id="work" style="min-height: 100vh">
            <h2>Works</h2>
            <div>
              ${projects
                .map(
                  (project) => /*html */ `
                <div >
                  <h2>${project.displayName}</h2>
                  <p>${project.summary}</p>
                  <p>${project.startedAt}</p>

                  <a href="/project/${project.id}">
                    View Project
                  </a>
                </div>`,
                )
                .join('')}
            </div>
          </section>

          <section id="social" style="min-height: 100vh">
            <h2>Social</h2>
          </section>
      </main>
      
      ${Footer(content.footer)}
    `,
  });
