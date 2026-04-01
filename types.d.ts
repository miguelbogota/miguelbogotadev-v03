/**
 * Represents the available theme options.
 * - `light`: Light mode
 * - `dark`: Dark mode
 * - `system`: Use system preference
 */
declare type ThemeType = 'light' | 'dark' | 'system';

declare type Content = {
  navigation: {
    name: string;
    links: {
      id: string;
      label: string;
    }[];
    actions: {
      resume: { href: string; label: string };
      themePicker: {
        ariaLabel: string;
        options: (
          | {
              label: string;
              ariaLabel: string;
              value: ThemeType;
              icon: string;
            }
          | 'divider'
        )[];
      };
    };
  };

  profile: {
    overline: string;
    image: {
      url: string;
      alt: string;
    };
    title: string;
    description: string;
  };

  work: {
    title: string;
    description: string;
    noResults: string;
    searchBar: {
      label: string;
      placeholder: string;
    };
    card: {
      aria: {
        leadingLabel: string;
        trailingLabel: string;
      };
      viewDetails: string;
    };
    pagination: {
      previous: string;
      goToPage: string;
      next: string;
    };
  };
  social: {
    title: string;
    description: string;
    links: {
      label: string;
      icon: string;
      link: string;
    }[];
  };

  footer: {
    text: string;
  };
};

/**
 * Represents a portfolio project with comprehensive details about
 * its scope, implementation, and resources.
 */
declare type Project = {
  /** Unique identifier for the project. */
  id: string;
  /** Project start date in format yyyy-mm-dd. */
  startedAt: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
  /** Indicates if the project is currently active. */
  isCurrent: boolean;
  /** Indicates if the project is archived. */
  isArchived: boolean;
  /** Indicates if the project is an aggregate of multiple related projects. */
  aggregate?: boolean;
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
  /** Describes the problem being solved. */
  challenge: {
    /** Challenge headline that reads naturally as a sentence. */
    title: string;
    /** Detailed explanation of the problem. */
    description: string;
  };
  /** Describes how the challenge was addressed. */
  solution: {
    /** Solution headline that reads naturally as a sentence. */
    title: string;
    /** Detailed explanation of the approach. */
    description: string;
  };
  /** Project showcase images. */
  images: {
    /** Image file path or URL. */
    src: string;
    /** Accessible text describing the image. */
    alt: string;
  }[];
  /** External resources related to the project. */
  links?: {
    /** GitHub repository URL (optional). */
    github?: string;
    /** Live project or website URL (optional). */
    website?: string;
  };
};

declare interface Window {
  /** App global state to share data between server and client. */
  __STATE__: {
    /** Current URL of the page. */
    url: string;
    /** Current theme of the application. */
    theme: ThemeType;
    /** Content object containing all the content. */
    content: Content;
    /** Projects array containing all the projects. */
    projects: Project[];
  };
}
