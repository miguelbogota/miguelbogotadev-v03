import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemePicker } from './theme.picker.component';
import { ThemePickerProvider } from './theme-picker.context';
import { type ThemeType } from './theme-type.type';

const { saveThemeMock } = vi.hoisted(() => {
  return { saveThemeMock: vi.fn() };
});

// Mock the server function
vi.mock('@tanstack/react-start/server', () => ({
  setCookie: vi.fn(),
}));

vi.mock('@tanstack/react-start', () => ({
  createServerFn: vi.fn(() => ({
    inputValidator: vi.fn(() => ({
      handler: () => saveThemeMock,
    })),
  })),
}));

describe('components / ThemePicker', () => {
  const renderWithProvider = (theme: ThemeType = 'system') => {
    return render(
      <ThemePickerProvider theme={theme}>
        <ThemePicker />
      </ThemePickerProvider>,
    );
  };

  beforeEach(() => {
    // Reset html data-theme attribute
    document.documentElement.removeAttribute('data-theme');
    vi.clearAllMocks();
  });

  it('should renders without crashing', () => {
    renderWithProvider();
  });

  it('should render a main button with initial icon', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    expect(mainButton).toBeTruthy();
  });

  it('should show dropdown menu on button hover', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    expect(screen.getByRole('option', { name: /light/i })).toBeTruthy();
    expect(screen.getByRole('option', { name: /dark/i })).toBeTruthy();
    expect(screen.getByRole('option', { name: /system/i })).toBeTruthy();
  });

  it('should hide dropdown menu on mouse leave', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);
    fireEvent.mouseLeave(mainButton);

    expect(screen.queryByRole('option', { name: /light/i })).toBeFalsy();
  });

  it('should set data-theme to light when light option is clicked', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should set data-theme to dark when dark option is clicked', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const darkOption = screen.getByRole('option', { name: /dark/i });
    fireEvent.click(darkOption);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should set data-theme to system when system option is clicked', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const systemOption = screen.getByRole('option', { name: /system/i });
    fireEvent.click(systemOption);

    expect(document.documentElement.getAttribute('data-theme')).toBe('system');
  });

  it('should update main button icon when theme changes', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    // Check that the sun icon is present in the button
    expect(mainButton.querySelector('.bx-sun')).toBeTruthy();
  });

  it('should mark the current theme option as active', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    fireEvent.mouseEnter(mainButton);
    const activeOption = screen.getByRole('option', { name: /light/i });

    expect(activeOption.getAttribute('aria-pressed')).toBe('true');
  });

  it('should unmark other theme options as inactive', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    fireEvent.mouseEnter(mainButton);
    const darkOption = screen.getByRole('option', { name: /dark/i });

    expect(darkOption.getAttribute('aria-pressed')).toBe('false');
  });

  it('should close dropdown after selecting an option', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    expect(screen.queryByRole('option', { name: /dark/i })).toBeFalsy();
  });

  it('should call saveTheme server function when theme is changed', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const darkOption = screen.getByRole('option', { name: /dark/i });
    fireEvent.click(darkOption);

    expect(saveThemeMock).toHaveBeenCalledWith({ data: { theme: 'dark' } });
  });

  it('should render with correct initial theme from provider', () => {
    renderWithProvider('light');

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    expect(mainButton.querySelector('.bx-sun')).toBeTruthy();
  });

  it('should toggle dropdown when main button is clicked', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });

    // Initially closed
    expect(screen.queryByRole('option', { name: /light/i })).toBeFalsy();

    // Click to open
    fireEvent.click(mainButton);
    expect(screen.getByRole('option', { name: /light/i })).toBeTruthy();

    // Click to close
    fireEvent.click(mainButton);
    expect(screen.queryByRole('option', { name: /light/i })).toBeFalsy();
  });

  it('should show divider before system option', () => {
    renderWithProvider();

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const dropdown = screen.getByRole('option', { name: /light/i }).closest('.dropdown');
    const divider = dropdown?.querySelector('.divider');

    expect(divider).toBeTruthy();
  });
});
