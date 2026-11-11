import { projectFixture } from '@/testing';

/** Fresh service module instance loaded before each test to reset its static project cache. */
let projectsService: (typeof import('./projects.service'))['projectsService'];

describe('projects / service', () => {
  beforeEach(async () => {
    vi.resetModules();
    ({ projectsService } = await import('./projects.service'));
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return the project index', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(projectsService.getProjects()).resolves.toEqual([projectFixture]);
  });

  it('should reuse projects already loaded in memory', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await projectsService.getProjects();
    await projectsService.getProjects();

    expect(fetch).toHaveBeenCalledOnce();
  });

  it('should reject an unsuccessful project-index response', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 503 }));

    await expect(projectsService.getProjects()).rejects.toThrow('503');
  });

  it('should return a project by id', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(projectsService.getProject(projectFixture.id)).resolves.toEqual(projectFixture);
  });

  it('should return null when a project id is not published', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(projectsService.getProject('missing-project')).resolves.toBeNull();
  });

  it('should remove YAML frontmatter from Markdown', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('---\nid: portfolio-project\ntitle: Portfolio\n---\n\n# Architecture'),
    );

    await expect(projectsService.getProjectContent(projectFixture)).resolves.toBe('# Architecture');
  });

  it('should encode the project id in the Markdown URL', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('# Project'));

    await projectsService.getProjectContent({ ...projectFixture, id: 'project/with spaces' });

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('project%2Fwith%20spaces.md'));
  });

  it('should return null when Markdown is missing', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    await expect(projectsService.getProjectContent(projectFixture)).resolves.toBeNull();
  });

  it('should return null when the Markdown request fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network unavailable'));

    await expect(projectsService.getProjectContent(projectFixture)).resolves.toBeNull();
  });
});
