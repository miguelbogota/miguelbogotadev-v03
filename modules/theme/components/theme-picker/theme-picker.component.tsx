'use client';

import './theme-picker.styles.scss';

import clsx from 'clsx';
import { Fragment, useRef, useState } from 'react';

import { useAppState } from '@/state';

import { themeService } from '../../services/theme.service';
import { type Theme } from '../../types/types';

/** A selectable theme entry or a visual divider in the theme menu. */
type ThemeOption =
  | {
      label: string;
      ariaLabel: string;
      value: Theme;
      icon: string;
    }
  | 'divider';

/** Ordered entries displayed in the theme picker menu. */
const options: ThemeOption[] = [
  { label: 'Light', ariaLabel: 'Light mode', value: 'light', icon: 'bx-sun' },
  { label: 'Dark', ariaLabel: 'Dark mode', value: 'dark', icon: 'bx-moon' },
  'divider',
  { label: 'System', ariaLabel: 'System preference', value: 'system', icon: 'bx-desktop' },
];

/**
 * Renders a menu that switches between the light, dark, and system themes.
 * A selection updates the document attribute, application state, and persisted cookie.
 *
 * @example
 * ```tsx
 * import { ThemePicker } from '@/modules/theme';
 *
 * export function Navigation() {
 *   return <ThemePicker />;
 * }
 * ```
 *
 * @returns The interactive theme picker.
 */
export function ThemePicker() {
  const { currentTheme, setCurrentTheme } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentThemeIcon = options
    .filter((option) => option !== 'divider')
    .find((option) => option.value === currentTheme)?.icon;

  /**
   * Applies a selected theme and closes the menu.
   *
   * @param theme - The theme selected by the user.
   */
  const handleThemeChange = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeService.setThemeCookie(theme);
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
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

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
                      aria-selected={currentTheme === option.value}
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
