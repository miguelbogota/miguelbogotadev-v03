import { act, renderHook } from '@testing-library/react';

import { useAppState } from '@/modules/shared';

import { useDrawerNavigation } from './use-drawer-navigation';

vi.mock('@/modules/shared', () => ({
  useAppState: vi.fn(),
}));

describe('useDrawerNavigation', () => {
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

  it('should replace the active drawer history entry when another project opens', () => {
    const replaceState = vi.spyOn(window.history, 'replaceState');
    const { result } = renderHook(() => useDrawerNavigation());

    act(() => result.current('/project/first-project'));
    act(() => result.current('/project/second-project'));

    expect(replaceState).toHaveBeenCalledWith(
      { drawerProjectId: 'second-project' },
      '',
      '/project/second-project',
    );
  });
});
