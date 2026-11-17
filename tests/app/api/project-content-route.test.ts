import { GET } from '@/app/api/project/[projectId]/content/route';
import { projectService } from '@/modules/project/services/project.service';
import { RequestError } from '@/modules/shared';

vi.mock('@/modules/project/services/project.service', () => ({
  projectService: {
    getContent: vi.fn(),
  },
}));

/** Creates route context for an internal project-content request. */
function createContext(projectId: string) {
  return { params: Promise.resolve({ projectId }) };
}

describe('api / project content', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return server-loaded Markdown without exposing its source', async () => {
    vi.mocked(projectService.getContent).mockResolvedValue('# Project details');

    const response = await GET(
      new Request('http://localhost/api/project/portfolio/content'),
      createContext('portfolio'),
    );

    expect(projectService.getContent).toHaveBeenCalledWith({ id: 'portfolio' });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    await expect(response.text()).resolves.toBe('# Project details');
  });

  it('should return a sanitized not-found response', async () => {
    vi.mocked(projectService.getContent).mockRejectedValue(
      new RequestError({ code: 404, message: 'Upstream path and identifier details.' }),
    );

    const response = await GET(
      new Request('http://localhost/api/project/missing/content'),
      createContext('missing'),
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ message: 'Project content was not found.' });
  });

  it('should return a sanitized internal response for upstream failures', async () => {
    vi.mocked(projectService.getContent).mockRejectedValue(
      new RequestError({ code: 503, message: 'Private upstream failure details.' }),
    );

    const response = await GET(
      new Request('http://localhost/api/project/portfolio/content'),
      createContext('portfolio'),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ message: 'Project content is unavailable.' });
  });
});
