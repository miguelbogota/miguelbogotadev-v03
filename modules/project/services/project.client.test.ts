import { projectFixture } from '@/testing';

import { projectClient } from './project.client';

describe('projects / client service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return Markdown from the internal project API', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('# Architecture'));

    await expect(projectClient.getContent(projectFixture)).resolves.toBe('# Architecture');
    expect(fetch).toHaveBeenCalledWith(`/api/project/${projectFixture.id}/content`);
  });

  it('should encode the project id in the internal API URL', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('# Project'));

    await projectClient.getContent({ id: 'project/with spaces' });

    expect(fetch).toHaveBeenCalledWith('/api/project/project%2Fwith%20spaces/content');
  });

  it('should reject with a not-found request error when Markdown is missing', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    await expect(projectClient.getContent(projectFixture)).rejects.toMatchObject({
      code: 404,
      message: `Project content for "${projectFixture.id}" was not found.`,
    });
  });

  it('should reject with an internal request error when the Markdown request fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('network unavailable'));

    await expect(projectClient.getContent(projectFixture)).rejects.toMatchObject({
      code: 500,
      message: `Project content for "${projectFixture.id}" could not be loaded.`,
    });
  });
});
