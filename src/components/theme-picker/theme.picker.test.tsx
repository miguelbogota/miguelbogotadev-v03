import { render, screen, fireEvent, act } from '@/testing';
import { ThemePicker } from './theme.picker.component';

describe('components / ThemePicker', () => {
  beforeEach(() => {
    // Reset html data-theme attribute
    document.documentElement.removeAttribute('data-theme');
    document.cookie = '';
    vi.clearAllMocks();
  });

  it('should renders without crashing', () => {
    render(<ThemePicker />);
  });

  it('should render a main button with initial icon', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    expect(mainButton).toBeTruthy();
  });

  it('should show dropdown menu on button hover', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    expect(screen.getByRole('option', { name: /light/i })).toBeTruthy();
    expect(screen.getByRole('option', { name: /dark/i })).toBeTruthy();
    expect(screen.getByRole('option', { name: /system/i })).toBeTruthy();
  });

  it('should hide dropdown menu on mouse leave after a short delay', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);
    fireEvent.mouseLeave(mainButton);

    // Wait for the timeout to trigger
    act(() => vi.runAllTimers());

    expect(screen.queryByRole('option', { name: /light/i })).toBeFalsy();
  });

  it('should set data-theme to light when light option is clicked', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should set data-theme to dark when dark option is clicked', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const darkOption = screen.getByRole('option', { name: /dark/i });
    fireEvent.click(darkOption);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should set data-theme to system when system option is clicked', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const systemOption = screen.getByRole('option', { name: /system/i });
    fireEvent.click(systemOption);

    expect(document.documentElement.getAttribute('data-theme')).toBe('system');
  });

  it('should update main button icon when theme changes', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    // Check that the sun icon is present in the button
    expect(mainButton.querySelector('.bx-sun')).toBeTruthy();
  });

  it('should mark the current theme option as active', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    fireEvent.mouseEnter(mainButton);
    const activeOption = screen.getByRole('option', { name: /light/i });

    expect(activeOption.getAttribute('aria-pressed')).toBe('true');
  });

  it('should unmark other theme options as inactive', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    fireEvent.mouseEnter(mainButton);
    const darkOption = screen.getByRole('option', { name: /dark/i });

    expect(darkOption.getAttribute('aria-pressed')).toBe('false');
  });

  it('should close dropdown after selecting an option', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const lightOption = screen.getByRole('option', { name: /light/i });
    fireEvent.click(lightOption);

    expect(screen.queryByRole('option', { name: /dark/i })).toBeFalsy();
  });

  it('should save the theme as a cookie', () => {
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const darkOption = screen.getByRole('option', { name: /dark/i });
    fireEvent.click(darkOption);

    expect(document.cookie).toContain('theme=dark');
  });

  it('should render with correct initial theme from provider', () => {
    render(<ThemePicker />, { state: { theme: 'light' } });

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    expect(mainButton.querySelector('.bx-sun')).toBeTruthy();
  });

  it('should toggle dropdown when main button is clicked', () => {
    render(<ThemePicker />);

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
    render(<ThemePicker />);

    const mainButton = screen.getByRole('button', { name: /theme selector/i });
    fireEvent.mouseEnter(mainButton);

    const dropdown = screen.getByRole('option', { name: /light/i }).closest('.dropdown');
    const divider = dropdown?.querySelector('.divider');

    expect(divider).toBeTruthy();
  });
});
