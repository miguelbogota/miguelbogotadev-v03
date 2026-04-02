import './navigation.styles.scss';

import { Fragment } from 'react';
import clsx from 'clsx';
import { Container } from '@/components/container';
import { ThemePicker } from '@/components/theme-picker';
import { useActiveIndicator } from './use-active-indicator.hook';
import { useAppState } from '@/state';

/**
 * With the given name, this function returns a list of span elements, where the first
 * letter of each word is wrapped in a span and the rest of the word is wrapped in another span.
 * This allows for styling the first letter and give a shrinking effect.
 *
 * @param name Name to display as the logo.
 */
const createLogoName = (name: string) =>
  name.split(' ').map((word, index) => (
    <Fragment key={index}>
      <span>{word.charAt(0)}</span>
      <span>{word.slice(1)}</span>
    </Fragment>
  ));

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
export function Navigation() {
  const {
    content: {
      navigation: { name, actions, links },
    },
  } = useAppState();

  const { activeSection, indicatorStyle, linksRef } = useActiveIndicator(
    links.map((section) => section.id),
  );

  /**
   * Handle name click to reset scroll
   */
  const handleNameClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.replaceState(null, '', window.location.href.split('#')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav role="navigation">
      <Container>
        {/* Logo / Name at the start of the navigation bar. */}
        <h3 className="logo">
          <a href="/" onClick={handleNameClick}>
            {createLogoName(name)}
          </a>
        </h3>

        {/* Central links to navigate. */}
        <div className="links">
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={clsx({ active: activeSection === link.id })}
                  ref={(el) => {
                    if (el) linksRef.current[link.id] = el;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    // For some reason the hash breaks the page if we are already on the same page
                    if (window.location.hash === `#${link.id}`) return;

                    window.history.replaceState(null, '', `#${link.id}`);
                    // Scroll to the section
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className="active-indicator"
            aria-hidden="true"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        </div>

        {/* Final actions (resume and theme picker) */}
        <div className="actions">
          <div className="actions-content">
            <a href={actions.resume.href} target="_blank" rel="noopener noreferrer">
              {actions.resume.label}
            </a>
            <ThemePicker />
          </div>
        </div>
      </Container>
    </nav>
  );
}
