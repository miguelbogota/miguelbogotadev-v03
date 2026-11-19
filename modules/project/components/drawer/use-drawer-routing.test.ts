import { act, renderHook } from '@testing-library/react';

import { useAppState } from '@/modules/shared';

import { useDrawerRouting } from './use-drawer-routing';

vi.mock('@/modules/shared', () => ({
  useAppState: vi.fn(),
}));

describe('useDrawerRouting', () => {
  const setCurrentProjectId = vi.fn();
  const setIsDrawerOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState({}, '', '/');
    vi.mocked(useAppState).mockReturnValue({
      projects: [],
      currentProjectId: null,
      setCurrentProjectId,
      currentTheme: 'system',
      setCurrentTheme: vi.fn(),
      isDrawerOpen: false,
      setIsDrawerOpen,
    });
  });

  it('should open the matching project when browser history moves to a project route', () => {
    renderHook(() => useDrawerRouting());
    window.history.pushState({}, '', '/project/portfolio-project');

    act(() => window.dispatchEvent(new PopStateEvent('popstate')));

    expect(setCurrentProjectId).toHaveBeenCalledWith('portfolio-project');
    expect(setIsDrawerOpen).toHaveBeenCalledWith(true);
  });

  it('should close the drawer when browser history returns home', () => {
    renderHook(() => useDrawerRouting());

    act(() => window.dispatchEvent(new PopStateEvent('popstate')));

    expect(setCurrentProjectId).toHaveBeenCalledWith(null);
    expect(setIsDrawerOpen).toHaveBeenCalledWith(false);
  });
});
