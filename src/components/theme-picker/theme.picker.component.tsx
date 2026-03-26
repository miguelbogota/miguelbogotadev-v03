import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import './theme.picker.styles.scss';

/**
 * Represents the available theme options.
 * - `light`: Light mode
 * - `dark`: Dark mode
 * - `system`: Use system preference
 */
export type ThemeType = 'light' | 'dark' | 'system';

/**
 * Array of all available theme options.
 * Used to populate the theme selector dropdown.
 */
const THEMES: ThemeType[] = ['light', 'dark', 'system'];

/**
 * Mapping of theme types to their corresponding icon class names.
 * Uses the Boxicons library (bx-*) for icon rendering.
 */
const THEME_ICONS: Record<ThemeType, string> = {
  light: 'bx-sun',
  dark: 'bx-moon',
  system: 'bx-monitor',
};

/**
 * ThemePicker Component
 *
 * A theme selector component that allows users to switch between light, dark, and system themes.
 * The selected theme is stored as a `data-theme` attribute on the document root element.
 *
 * Features:
 * - Hover to show/hide theme options
 * - Click to select a theme
 * - Persists selection to the DOM
 * - Shows visual indicator for the currently selected theme
 */
export function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('system');
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Initialize theme from DOM on component mount.
   * Reads the `data-theme` attribute from the document root, defaulting to 'system'.
   */
  useEffect(() => {
    const savedTheme = document.documentElement.getAttribute('data-theme') || 'system';
    setCurrentTheme(savedTheme as ThemeType);
  }, []);

  /**
   * Handle theme selection.
   * Updates the DOM attribute and closes the dropdown.
   *
   * @param theme - The theme to set
   */
  const handleThemeChange = (theme: ThemeType) => {
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div
      className="theme-picker"
      onMouseLeave={() => setIsOpen(false)}
      onMouseEnter={() => setIsOpen(true)}
    >
      <button className="theme-picker-trigger" aria-label="Theme selector">
        <i className={clsx('bx', THEME_ICONS[currentTheme], { hovered: isOpen })} />
      </button>

      {isOpen && (
        <div className="theme-picker-dropdown">
          <ul className="theme-picker-list">
            {THEMES.map((theme, index) => (
              <Fragment key={theme}>
                {index === 2 && <li className="theme-picker-divider" />}
                <li>
                  <button
                    role="option"
                    aria-pressed={currentTheme === theme ? 'true' : 'false'}
                    onClick={() => handleThemeChange(theme)}
                    className="theme-picker-option"
                  >
                    <i className={`bx ${THEME_ICONS[theme]}`} />
                    <span>{_.capitalize(theme)}</span>
                  </button>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
