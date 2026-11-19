import { SITE_URL } from '@/modules/shared';
import { projectFixture } from '@/testing';

import { seoService } from './seo.service';

describe('services / SeoService', () => {
  it('should create canonical home and social metadata', () => {
    const metadata = seoService.getHomeMetadata();

    expect(metadata.alternates).toEqual({ canonical: '/' });
    expect(metadata.openGraph).toMatchObject({ url: '/', title: 'Miguel Bogota' });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('should build manifest and crawler metadata routes', () => {
    expect(seoService.getManifest()).toMatchObject({
      start_url: '/',
      display: 'standalone',
      icons: [{ src: '/favicon.ico' }],
    });
    expect(seoService.getRobots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    });
  });

  it('should build home, privacy, and project sitemap entries', () => {
    expect(seoService.getSitemap([projectFixture])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: SITE_URL }),
        expect.objectContaining({ url: `${SITE_URL}/privacy` }),
        expect.objectContaining({ url: `${SITE_URL}/project/${projectFixture.id}` }),
      ]),
    );
  });

  it('should use the required project artwork for social metadata', () => {
    const project = {
      ...projectFixture,
      artwork: { src: 'https://example.com/artwork.png', alt: 'Project artwork' },
    };

    const metadata = seoService.getProjectMetadata(project);

    expect(metadata.alternates).toEqual({
      canonical: `/project/${project.id}`,
    });
    expect(metadata.title).toBe(`${project.displayName} | Miguel Bogota`);
    expect(metadata.openGraph).toMatchObject({
      images: [
        {
          url: project.artwork.src,
          width: 1200,
          height: 630,
          alt: project.artwork.alt,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      images: [project.artwork.src],
    });
  });
});
