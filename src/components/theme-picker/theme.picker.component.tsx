import './theme.picker.styles.scss';

import { Fragment, useRef, useState } from 'react';
import clsx from 'clsx';
import { cookies } from '@/utils/cookies';
import { useAppState } from '@/state';

/** Theme types available for selection. */
type ThemeOption =
  | {
      label: string;
      ariaLabel: string;
      value: ThemeType;
      icon: string;
    }
  | 'divider';

/** Options for the theme picker dropdown. */
const options: ThemeOption[] = [
  { label: 'Light', ariaLabel: 'Light mode', value: 'light', icon: 'bx-sun' },
  { label: 'Dark', ariaLabel: 'Dark mode', value: 'dark', icon: 'bx-moon' },
  'divider',
  { label: 'System', ariaLabel: 'System preference', value: 'system', icon: 'bx-desktop' },
];

/**
 * ThemePicker Component
 *
 * A theme selector component that allows users to switch between light, dark, and system themes.
 * The selected theme is stored as a `data-theme` attribute on the document root element.
 *
 * Features:
 * - Hover to show/hide theme options
 * - Smooth transition when showing/hiding
 * - Click to select a theme
 * - Persists selection to the DOM
 * - Shows visual indicator for the currently selected theme
 */
export function ThemePicker() {
  const { currentTheme, setCurrentTheme } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentThemeIcon = options
    .filter((option) => option !== 'divider')
    .find((option) => option.value === currentTheme)?.icon;

  /**
   * Handle theme selection.
   * Updates the DOM attribute and closes the dropdown.
   */
  const handleThemeChange = (theme: ThemeType) => {
    document.documentElement.setAttribute('data-theme', theme);
    cookies.set('theme', theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div
      className="theme-picker"
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
      }}
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
      }}
    >
      <button onClick={() => setIsOpen((prev) => !prev)} aria-label="Theme selector">
        <i className={clsx('bx', currentThemeIcon, { hovered: isOpen })} />
      </button>

      {isOpen && (
        <div className="dropdown">
          <ul>
            {options.map((option, index) =>
              option === 'divider' ? (
                <li className="divider" key={`divider-${index}`} />
              ) : (
                <Fragment key={option.value}>
                  <li>
                    <button
                      role="option"
                      aria-pressed={currentTheme === option.value ? 'true' : 'false'}
                      aria-label={option.ariaLabel}
                      onClick={() => handleThemeChange(option.value)}
                    >
                      <i className={clsx('bx', option.icon)} />
                      <span>{option.label}</span>
                    </button>
                  </li>
                </Fragment>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
