import { fireEvent, render, screen } from '@testing-library/react';

import { useAppState } from '@/modules/shared';
import { projectFixture } from '@/testing';

import { Drawer } from './drawer.component';

vi.mock('@/modules/shared', () => ({
  useAppState: vi.fn(),
}));

vi.mock('../project-info', () => ({
  ProjectInfo: (props: { closeButton?: React.ReactNode }) => (
    <div>
      <h1 id="drawer-title">Project</h1>
      <p id="drawer-description">Project details</p>
      {props.closeButton}
    </div>
  ),
}));

describe('components / Drawer', () => {
  const setCurrentProjectId = vi.fn();
  const setIsDrawerOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppState).mockReturnValue({
      projects: [projectFixture],
      currentProjectId: projectFixture.id,
      setCurrentProjectId,
      currentTheme: 'system',
      setCurrentTheme: vi.fn(),
      isDrawerOpen: true,
      setIsDrawerOpen,
    });
  });

  it('should expose modal semantics and make background content inert', () => {
    render(
      <>
        <main data-testid="background">Portfolio</main>
        <Drawer />
      </>,
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByTestId('background')).toHaveAttribute('inert');
  });

  it('should keep a higher overlay interactive while the page background is inert', () => {
    render(
      <>
        <main data-testid="background">Portfolio</main>
        <aside data-inert-exempt>
          <button type="button">OK</button>
        </aside>
        <Drawer />
      </>,
    );

    expect(screen.getByTestId('background')).toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: 'OK' }).parentElement).not.toHaveAttribute('inert');
  });

  it('should include a higher overlay in the drawer focus loop', () => {
    render(
      <>
        <aside data-inert-exempt>
          <button type="button">OK</button>
        </aside>
        <Drawer />
      </>,
    );

    const closeButton = screen.getByRole('button', { name: 'Close project details' });
    const noticeButton = screen.getByRole('button', { name: 'OK' });

    closeButton.focus();
    fireEvent.keyDown(closeButton, { key: 'Tab', shiftKey: true });

    expect(noticeButton).toHaveFocus();
  });

  it('should close with Escape and clear the active project', () => {
    render(<Drawer />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(setIsDrawerOpen).toHaveBeenCalledWith(false);
    expect(setCurrentProjectId).toHaveBeenCalledWith(null);
  });
});
