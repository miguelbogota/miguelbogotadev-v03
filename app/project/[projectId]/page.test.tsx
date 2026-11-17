import { notFound } from 'next/navigation';

import { projectClient } from '@/modules/project/services/project.client';
import { getCachedProject, getCachedProjects } from '@/modules/project/services/project.service';
import { RequestError } from '@/modules/shared';
import { projectFixture, render, screen } from '@/testing';

import ProjectPage, { generateMetadata, generateStaticParams, instant } from './page';
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

vi.mock('@/modules/project/services/project.service', () => ({
  getCachedProject: vi.fn(),
  getCachedProjects: vi.fn(),
}));

describe('app / project route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should opt the intentionally dropped not-found segment out of instant validation', () => {
    expect(instant).toBe(false);
  });

  it('should generate every published project path', async () => {
    vi.mocked(getCachedProjects).mockResolvedValue([
      projectFixture,
      { ...projectFixture, id: 'another-project' },
    ]);

    await expect(generateStaticParams()).resolves.toEqual([
      { projectId: projectFixture.id },
      { projectId: 'another-project' },
    ]);
  });

  it('should generate project-specific metadata and social images', async () => {
    vi.mocked(getCachedProject).mockResolvedValue(projectFixture);

    const metadata = await generateMetadata({
      params: Promise.resolve({ projectId: projectFixture.id }),
    });

    expect(metadata).toMatchObject({
      title: `${projectFixture.displayName} | Miguel Bogota`,
      description: projectFixture.summary,
      alternates: { canonical: `/project/${projectFixture.id}` },
      openGraph: {
        title: `${projectFixture.displayName} | Miguel Bogota`,
        images: [{ url: projectFixture.images[0]?.src, alt: projectFixture.images[0]?.alt }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [projectFixture.images[0]?.src],
      },
    });
  });

  it('should render project metadata before client Markdown resolves', async () => {
    vi.mocked(getCachedProject).mockResolvedValue(projectFixture);
    vi.spyOn(projectClient, 'getContent').mockReturnValue(new Promise(() => {}));

    render(
      await ProjectPage({
        params: Promise.resolve({ projectId: projectFixture.id }),
      }),
    );

    expect(screen.getByRole('heading', { name: projectFixture.displayName })).toBeInTheDocument();
    expect(screen.getByText(projectFixture.summary)).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading project details' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to the portfolio' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('should return the project not-found boundary for an unknown id', async () => {
    vi.mocked(getCachedProject).mockRejectedValue(
      new RequestError({ code: 404, message: 'Project not found.' }),
    );

    await expect(
      ProjectPage({ params: Promise.resolve({ projectId: 'missing-project' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalledOnce();
  });

  it('should preserve unexpected request failures for the route error boundary', async () => {
    const error = new RequestError({ code: 503, message: 'Projects are unavailable.' });

    vi.mocked(getCachedProject).mockRejectedValue(error);

    await expect(
      ProjectPage({ params: Promise.resolve({ projectId: projectFixture.id }) }),
    ).rejects.toBe(error);
    expect(notFound).not.toHaveBeenCalled();
  });
});
