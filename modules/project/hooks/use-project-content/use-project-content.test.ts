import { analyticsService } from '@/modules/analytics';
import { act, projectFixture, renderHook } from '@/testing';

import { projectClient } from '../../services/project.client';
import { useProjectContent } from '.';

vi.mock('@/modules/project/services/project.client', () => ({
  projectClient: {
    getContent: vi.fn(),
  },
}));

vi.mock('@/modules/analytics/services/analytics.service', () => ({
  analyticsService: {
    trackException: vi.fn(),
  },
}));

describe('useProjectContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load project content through the client', async () => {
    const content = { overview: '# Project', initiatives: [] };
    const request = Promise.resolve(content);

    vi.mocked(projectClient.getContent).mockReturnValue(request);

    const { result } = renderHook(() => useProjectContent(projectFixture));

    expect(result.current.isLoadingContent).toBe(true);

    await act(async () => {
      await request;
    });

    expect(result.current.content).toEqual(content);
    expect(result.current.isLoadingContent).toBe(false);
    expect(result.current.contentError).toBeNull();
  });

  it('should abort the previous request when the project changes', () => {
    const signals: AbortSignal[] = [];

    vi.mocked(projectClient.getContent).mockImplementation((_project, options) => {
      if (options?.signal) {
        signals.push(options.signal);
      }

      return new Promise(() => {});
    });

    const { rerender } = renderHook(({ project }) => useProjectContent(project), {
      initialProps: { project: projectFixture },
    });

    rerender({ project: { ...projectFixture, id: 'another-project' } });

    expect(signals[0]?.aborted).toBe(true);
    expect(signals[1]?.aborted).toBe(false);
    expect(analyticsService.trackException).not.toHaveBeenCalled();
  });
});
