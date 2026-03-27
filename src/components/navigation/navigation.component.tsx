import { ThemePicker } from '../theme-picker';
import { createLogoName } from './create-logo-name.function';
import { Container } from '@/components/container';
import clsx from 'clsx';
import './navigation.styles.scss';
import { useActiveIndicator } from './use-active-indicator.hook';

/**
 * Navigation Component Props
 */
export interface NavigationProps {
  logoName: string;
  links: {
    id: string;
    label: string;
  }[];
  externalLink: {
    href: string;
    label: string;
  };
}

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
export function Navigation(props: NavigationProps) {
  const { logoName, links, externalLink } = props;

  const { activeSection, indicatorStyle, linksRef } = useActiveIndicator(
    links.map((section) => section.id),
  );

  /**
   * Handle name click to reset scroll
   */
  const handleNameClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav role="navigation">
      <Container>
        {/* Logo / Name at the start of the navigation bar. */}
        <h3 className="logo">
          <a href="/" onClick={handleNameClick}>
            {createLogoName(logoName)}
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
            <a href={externalLink.href} target="_blank" rel="noopener noreferrer">
              {externalLink.label}
            </a>
            <ThemePicker />
          </div>
        </div>
      </Container>
    </nav>
  );
}
