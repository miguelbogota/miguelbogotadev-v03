import { projectFixture } from '@/testing';

import { DEFAULT_SOCIAL_IMAGE, SITE_URL } from '../config/constants';
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

  it('should use the first valid project image', () => {
    const project = {
      ...projectFixture,
      images: [
        { src: 'https://example.com/project.png', alt: 'Project preview' },
        { src: 'https://example.com/second.png', alt: 'Second preview' },
      ],
    };

    expect(seoService.getProjectImage(project)).toBe('https://example.com/project.png');
    expect(seoService.getProjectMetadata(project).alternates).toEqual({
      canonical: `/project/${project.id}`,
    });
  });

  it('should use the fallback image when project artwork is invalid', () => {
    const project = {
      ...projectFixture,
      images: [
        { src: '', alt: 'Empty' },
        { src: 'http://[invalid', alt: 'Invalid' },
      ],
    };

    expect(seoService.getProjectImage(project)).toBe(
      new URL(DEFAULT_SOCIAL_IMAGE, SITE_URL).toString(),
    );
  });
});
