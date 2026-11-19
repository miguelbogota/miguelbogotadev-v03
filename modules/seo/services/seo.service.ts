import { type Metadata, type MetadataRoute } from 'next';

import { type Project } from '@/modules/project';
import { SITE_NAME, SITE_URL } from '@/modules/shared';

import { DEFAULT_SOCIAL_IMAGE, SITE_DESCRIPTION } from '../config/constants';

/** Creates consistent canonical, search, and social metadata for portfolio routes. */
class SeoService {
  /** Builds the installable portfolio manifest. */
  getManifest(): MetadataRoute.Manifest {
    return {
      name: SITE_NAME,
      short_name: SITE_NAME,
      description: SITE_DESCRIPTION,
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [{ src: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' }],
    };
  }

  /** Builds crawler rules and the canonical sitemap location. */
  getRobots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  /**
   * Builds public sitemap entries from the cached project index.
   *
   * @param projects - Published projects returned by the project service.
   * @returns Home, privacy, and canonical project sitemap entries.
   */
  getSitemap(projects: Project[]): MetadataRoute.Sitemap {
    return [
      { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
      { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
      ...projects.map((project) => ({
        url: `${SITE_URL}/project/${project.id}`,
        lastModified: project.endedAt ?? project.startedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ];
  }

  /** Builds metadata for the portfolio home route. */
  getHomeMetadata(): Metadata {
    return this.createMetadata({
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      path: '/',
      image: DEFAULT_SOCIAL_IMAGE,
    });
  }

  /** Builds metadata for the privacy information route. */
  getPrivacyMetadata(): Metadata {
    return this.createMetadata({
      title: `Privacy | ${SITE_NAME}`,
      description: 'How this portfolio uses a theme cookie and pseudonymous analytics.',
      path: '/privacy',
      image: DEFAULT_SOCIAL_IMAGE,
    });
  }

  /**
   * Builds project-specific metadata using the project's required wide artwork.
   *
   * @param project - Published project used to populate metadata.
   * @returns Canonical search and social metadata for the project.
   */
  getProjectMetadata(project: Project): Metadata {
    return this.createMetadata({
      title: `${project.displayName} | ${SITE_NAME}`,
      description: project.summary,
      path: `/project/${project.id}`,
      image: project.artwork.src,
      imageAlt: project.artwork.alt,
      keywords: project.tags,
    });
  }

  /**
   * Creates the common metadata shape shared by public portfolio routes.
   *
   * @param data - Route-specific metadata values.
   * @returns Next.js metadata with canonical, Open Graph, and X/Twitter fields.
   */
  private createMetadata(data: {
    title: string;
    description: string;
    path: string;
    image: string;
    imageAlt?: string;
    keywords?: string[];
  }): Metadata {
    const { title, description, path, image, imageAlt = `${SITE_NAME} portfolio`, keywords } = data;
    const socialImage = { url: image, width: 1200, height: 630, alt: imageAlt };

    return {
      title,
      description,
      keywords,
      alternates: { canonical: path },
      openGraph: {
        type: 'website',
        url: path,
        siteName: SITE_NAME,
        title,
        description,
        images: [socialImage],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  }
}

/** Shared SEO metadata service. */
export const seoService = new SeoService();
