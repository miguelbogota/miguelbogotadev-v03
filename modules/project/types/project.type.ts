/** Image asset used by a portfolio project. */
type ProjectMedia = {
  /** Image file path or URL. */
  src: string;
  /** Accessible text describing the image. */
  alt: string;
};

/** External resource associated with a project or initiative. */
type ProjectLink = {
  /** Display text and accessible name for the link. */
  label: string;
  /** Boxicons class names for the external resource. */
  icon: string;
  /** URL to the external resource. */
  url: string;
};

/** A focused body of work completed within a larger experience. */
export type ProjectInitiative = {
  /** Identifier matching the initiative Markdown filename. */
  id: string;
  /** User-facing initiative title. */
  displayName: string;
  /** Short preview shown before expanding the initiative. */
  summary: string;
  /** Position held while contributing to the initiative. */
  role: string;
  /** Initiative industry or product domain. */
  industry: string;
  /** Technologies and relevant keywords. */
  tags: string[];
  /** External resources specific to the initiative. */
  links: ProjectLink[];
};

/** Markdown loaded for one initiative. */
export type ProjectInitiativeContent = {
  /** Initiative identifier matching published metadata. */
  id: string;
  /** Initiative Markdown without YAML frontmatter. */
  markdown: string;
};

/** Complete long-form content loaded before project details are revealed. */
export type ProjectContent = {
  /** Main project or experience Markdown without YAML frontmatter. */
  overview: string;
  /** Preloaded initiative Markdown in published display order. */
  initiatives: ProjectInitiativeContent[];
};

/**
 * Represents a portfolio project with comprehensive details about
 * its scope, implementation, and resources.
 */
export type Project = {
  /** Unique identifier for the project. */
  id: string;
  /** Project start date in format yyyy-mm-dd. */
  startedAt: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
  /** Project end date in format yyyy-mm-dd. */
  endedAt: `${number}${number}${number}${number}-${number}${number}-${number}${number}` | null;
  /** Indicates if I'm currently working at that place. */
  isCurrent: boolean;
  /** Indicates if the project is archived. */
  isArchived: boolean;
  /** Published Markdown layout derived from the API source structure. */
  contentLayout: 'standalone' | 'overview';
  /** Project title. */
  displayName: string;
  /** Brief overview of what the project does. */
  summary: string;
  /** User's role or position in the project. */
  role: string;
  /** Organization or company associated with the project. */
  companyName: string;
  /** Industry, domain, or category (e.g., "Finance", "E-commerce"). */
  industry: string;
  /** Technology stack and relevant keywords. */
  tags: string[];
  /** Compact 3:2 image used by project cards. */
  thumbnail: ProjectMedia;
  /** Wide 1200:630 artwork used by social previews and project details. */
  artwork: ProjectMedia;
  /** External resources related to the project. */
  links: ProjectLink[];
  /** Initiative previews loaded from the project's folder. */
  initiatives: ProjectInitiative[];
};
