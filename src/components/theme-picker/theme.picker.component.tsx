import { Fragment, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import './theme.picker.styles.scss';
import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { type ThemeType } from './theme-type.type';
import { useThemePicker } from './theme-picker.context';

/** Function to store the theme as a cookie. */
const saveTheme = createServerFn({ method: 'POST' })
  .inputValidator((data: { theme: ThemeType }) => data)
  .handler(({ data: { theme } }) => setCookie('theme', theme));

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
  const { currentTheme, setCurrentTheme } = useThemePicker();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handle theme selection.
   * Updates the DOM attribute and closes the dropdown.
   */
  const handleThemeChange = (theme: ThemeType) => {
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
    setIsOpen(false);
    saveTheme({ data: { theme } });
  };

  return (
    <div
      className="theme-picker"
      onMouseLeave={() => setIsOpen(false)}
      onMouseEnter={() => setIsOpen(true)}
    >
      <button onClick={() => setIsOpen((prev) => !prev)} aria-label="Theme selector">
        <i className={clsx('bx', THEME_ICONS[currentTheme], { hovered: isOpen })} />
      </button>

      {isOpen && (
        <div className="dropdown">
          <ul>
            {THEMES.map((theme, index) => (
              <Fragment key={theme}>
                {index === 2 && <li className="divider" />}
                <li>
                  <button
                    role="option"
                    aria-pressed={currentTheme === theme ? 'true' : 'false'}
                    onClick={() => handleThemeChange(theme)}
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
