import { RequestError } from '@/modules/shared';
import { projectFixture } from '@/testing';

import { projectsService } from './projects.service';

describe('projects / service', () => {
  beforeEach(() => {
    projectsService._clearCache();
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

    await expect(projectsService.getProjects()).rejects.toMatchObject({
      code: 503,
      message: 'The projects API request failed with status 503.',
    });
  });

  it('should reject with an internal request error when the project index cannot load', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network unavailable'));

    await expect(projectsService.getProjects()).rejects.toMatchObject({
      code: 500,
      message: 'The projects API request could not be completed.',
    });
  });

  it('should return a project by id', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(projectsService.getProject(projectFixture.id)).resolves.toEqual(projectFixture);
  });

  it('should reject with a not-found request error when a project is not published', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(projectsService.getProject('missing-project')).rejects.toEqual(
      new RequestError({ code: 404, message: 'Project "missing-project" was not found.' }),
    );
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

  it('should reject with a not-found request error when Markdown is missing', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    await expect(projectsService.getProjectContent(projectFixture)).rejects.toMatchObject({
      code: 404,
      message: `Project content for "${projectFixture.id}" was not found.`,
    });
  });

  it('should reject with an internal request error when the Markdown request fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network unavailable'));

    await expect(projectsService.getProjectContent(projectFixture)).rejects.toMatchObject({
      code: 500,
      message: `Project content for "${projectFixture.id}" could not be loaded.`,
    });
  });
});
