import type { Content } from '../types/content';

/** Props for the Profile section. */
export type ProfileProps = Content['profile'];

/** Profile section component. */
export function ProfileSection({ title, description, overline, image }: ProfileProps) {
  return /*html */ `
    <section id="profile">
      <div class="profile-container">
        <div class="information">
          <img src="${image.url}" alt="${image.alt}" />

          <p>${overline}</p>

          <h1>
            ${title
              .split('\n')
              .map((line) => /*html*/ `<span>${line}</span>`)
              .join('')}
          </h1>

          <p class="overline">${description}</p>
        </div>

        <div class="pet"></div>
      </div>
    </section>`;
}
