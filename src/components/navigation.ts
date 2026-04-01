import clsx from 'clsx';
import type { Content } from '../types/content';

/** Navigation Component Props */
export type NavigationProps = Content['navigation'];

/**
 * Navigation Component
 *
 * A fixed navbar with glassmorphic design featuring:
 * - Site name/logo on the left that resets scroll
 * - Center navigation with active section indicator
 * - Resume link and theme picker on the right
 * - Responsive design with mobile breakpoint
 *
 * Mobile features:
 * - Collapsed site name (animated "MB" initials)
 * - No center links visible
 */
export function Navigation({ logoName, links, externalLink }: NavigationProps) {
  /**
   * With the given logo name, this function returns a list of span elements, where the first
   * letter of each word is wrapped in a span and the rest of the word is wrapped in another span.
   * This allows for styling the first letter and give a shrinking effect.
   */
  const createLogoName = (logoName: string) =>
    logoName
      .split(' ')
      .map((word) => /*html */ `<span>${word.charAt(0)}</span><span>${word.slice(1)}</span>`)
      .join(' ');

  return /*html*/ `
  <nav role="navigation">
    <div class="container">
      <!-- Logo / Name at the start of the navigation bar. -->
      <h3 class="logo">
        <a href="/#">${createLogoName(logoName)}</a>
      </h3>

      <!-- Central links to navigate. -->
        <div class="links">
          <ul>
            ${links
              .map(
                (link) => /*html */ `<li>
                <a href="#${link.id}" class="${clsx({ active: 'profile' === link.id })}">${link.label}</a>
              </li>`,
              )
              .join('')}
          </ul>
          <div class="active-indicator" aria-hidden="true"></div>
        </div>

        <!-- Final actions (resume and theme picker) -->
        <div class="actions">
          <div class="actions-content">
            <a href="${externalLink.href}" target="_blank" rel="noopener noreferrer">
              ${externalLink.label}
            </a>
          </div>
        </div>
    </div>
  </nav>`;
}

/** Initializes the navigation scroll indicator. */
export function initNavigationScrollIndicator(props: NavigationProps) {
  return /*html */ `
  <script>
    const activeIndicator = createActiveIndicator({
      ids: [${props.links.map((link) => `'${link.id}'`).join(', ')}],
      indicatorEl: document.querySelector('.active-indicator'),
    });

    document.querySelectorAll('a[href^="#"]').forEach((el) => {
      activeIndicator.registerLink(el.hash.replace('#', ''), el);
    });
  </script>
  `;
}
