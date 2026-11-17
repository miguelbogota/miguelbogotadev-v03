import { type Metadata, type MetadataRoute } from 'next';

import { type Project } from '@/modules/project/types/project.type';

import { DEFAULT_SOCIAL_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../config/constants';

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
   * Builds project-specific metadata using the first valid artwork URL or the fallback image.
   *
   * @param project - Published project used to populate metadata.
   * @returns Canonical search and social metadata for the project.
   */
  getProjectMetadata(project: Project): Metadata {
    return this.createMetadata({
      title: `${project.displayName} | ${SITE_NAME}`,
      description: project.summary,
      path: `/project/${project.id}`,
      image: this.getProjectImage(project),
      imageAlt: project.images.find((image) => this.isValidImageUrl(image.src))?.alt,
      keywords: project.tags,
    });
  }

  /**
   * Returns the first syntactically valid HTTP project image or the site fallback.
   *
   * @param project - Project whose artwork should be inspected.
   * @returns An absolute social image URL.
   */
  getProjectImage(project: Pick<Project, 'images'>): string {
    const image = project.images.find((item) => this.isValidImageUrl(item.src));

    return image
      ? new URL(image.src, SITE_URL).toString()
      : new URL(DEFAULT_SOCIAL_IMAGE, SITE_URL).toString();
  }

  /**
   * Determines whether a value resolves to an HTTP or HTTPS image URL.
   *
   * @param value - Candidate image source.
   * @returns Whether the value is safe to publish as social metadata.
   */
  private isValidImageUrl(value: string): boolean {
    if (!value.trim()) {
      return false;
    }

    try {
      const url = new URL(value, SITE_URL);

      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
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
    const isFallbackImage = new URL(image, SITE_URL).pathname === DEFAULT_SOCIAL_IMAGE;
    const socialImage = isFallbackImage
      ? { url: image, width: 1200, height: 630, alt: imageAlt }
      : { url: image, alt: imageAlt };

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
