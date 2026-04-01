import type { Content } from '../types/content';

/** Props for the Social section. */
export type SocialProps = Content['social'];

/** Social section component. */
export function SocialSection({ title, description, links }: SocialProps) {
  return /*html */ `
    <section id="social">
      <div class="social-container">
        <div class="content">
          <h2>${title}</h2>
          <p class="overline">${description}</p>

          <div class="social-networks">
            ${links
              .map(
                ({ label, icon, link }) => /* html */ `
              <a
                class="social-link"
                key="${label}"
                href="${link}"
                aria-label="${label}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="${icon}"></i>
              </a>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>`;
}
