import { renderHook } from '@testing-library/react';

import { useAppState } from '@/modules/shared';

import { useDrawerRouting } from './use-drawer-routing';

vi.mock('@/modules/shared', () => ({
  useAppState: vi.fn(),
}));

describe('useDrawerRouting', () => {
  it('should leave scroll restoration to the Next.js router and browser', () => {
    vi.mocked(useAppState).mockReturnValue({
      projects: [],
      currentProjectId: null,
      setCurrentProjectId: vi.fn(),
      currentTheme: 'system',
      setCurrentTheme: vi.fn(),
      isDrawerOpen: false,
      setIsDrawerOpen: vi.fn(),
    });

    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    window.sessionStorage.setItem('scroll-position', '1200');

    renderHook(() => useDrawerRouting());
    window.dispatchEvent(new Event('load'));

    expect(scrollTo).not.toHaveBeenCalled();
    scrollTo.mockRestore();
  });
});
