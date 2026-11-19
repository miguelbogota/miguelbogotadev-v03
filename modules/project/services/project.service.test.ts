import { cacheLife } from 'next/cache';

import { RequestError } from '@/modules/shared';
import { projectFixture } from '@/testing';

import { getCachedProject, getCachedProjects, projectService } from './project.service';

vi.mock('next/cache', () => ({ cacheLife: vi.fn() }));

describe('projects / server service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return the project index', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(projectService.getProjects()).resolves.toEqual([projectFixture]);
  });

  it('should use the shared project cache profile', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(getCachedProjects()).resolves.toEqual([projectFixture]);
    expect(cacheLife).toHaveBeenCalledWith('projects');
  });

  it('should reject an unsuccessful project-index response', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 503 }));

    await expect(projectService.getProjects()).rejects.toMatchObject({
      code: 503,
      message: 'The projects API request failed with status 503.',
    });
  });

  it('should reject with an internal request error when the project index cannot load', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network unavailable'));

    await expect(projectService.getProjects()).rejects.toMatchObject({
      code: 500,
      message: 'The projects API request could not be completed.',
    });
  });

  it('should return a cached project by id', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(getCachedProject(projectFixture.id)).resolves.toEqual(projectFixture);
  });

  it('should reject with a not-found request error when a project is not published', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify([projectFixture])));

    await expect(getCachedProject('missing-project')).rejects.toEqual(
      new RequestError({ code: 404, message: 'Project "missing-project" was not found.' }),
    );
  });

  it('should load Markdown and remove its YAML frontmatter', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('---\nid: portfolio-project\ntitle: Portfolio\n---\n\n# Architecture'),
    );

    await expect(projectService.getContent(projectFixture)).resolves.toBe('# Architecture');
  });

  it('should encode the project id in the upstream Markdown URL', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('# Project'));

    await projectService.getContent({ id: 'project/with spaces' });

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('project%2Fwith%20spaces.md'));
  });

  it('should reject when upstream Markdown is missing', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    await expect(projectService.getContent(projectFixture)).rejects.toMatchObject({
      code: 404,
      message: `Project content for "${projectFixture.id}" was not found.`,
    });
  });

  it('should reject when the upstream Markdown request fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network unavailable'));

    await expect(projectService.getContent(projectFixture)).rejects.toMatchObject({
      code: 500,
      message: `Project content for "${projectFixture.id}" could not be loaded.`,
    });
  });
});
