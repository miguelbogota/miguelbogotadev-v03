/**
 * Represents the available theme options.
 * - `light`: Light mode
 * - `dark`: Dark mode
 * - `system`: Use system preference
 */
declare type ThemeType = 'light' | 'dark' | 'system';

/**
 * Represents all content data for the application.
 * This type defines the structure for all user-facing text and labels
 * that can be dynamically updated through the content API.
 */
declare type Content = {
  /** Main application title used in browser tab and page headers. */
  title: string;

  /** Navigation menu configuration and links. */
  navigation: {
    /** Site name displayed in navigation header. */
    name: string;
    /** Array of navigation menu items. */
    links: {
      /** Unique identifier for the navigation link. */
      id: string;
      /** Display text for the navigation link. */
      label: string;
    }[];
    /** Action buttons and controls in the navigation. */
    actions: {
      /** Resume download button configuration. */
      resume: {
        /** URL where the resume file can be downloaded. */
        href: string;
        /** Text displayed on the resume button. */
        label: string;
      };
      /** Theme picker dropdown configuration. */
      themePicker: {
        /** Accessibility label for the theme picker button. */
        ariaLabel: string;
        /** Array of theme options or divider elements. */
        options: (
          | {
              /** Display text for the theme option. */
              label: string;
              /** Accessibility label for the theme option. */
              ariaLabel: string;
              /** Theme value that will be applied. */
              value: ThemeType;
              /** Icon class name for the theme option. */
              icon: string;
            }
          /** String literal 'divider' to create visual separation in options. */
          | 'divider'
        )[];
      };
    };
  };

  /** Profile section content and personal information. */
  profile: {
    /** Greeting text displayed above the main title. */
    overline: string;
    /** Profile image configuration. */
    image: {
      /** URL path to the profile image. */
      url: string;
      /** Alternative text for accessibility. */
      alt: string;
    };
    /** Main title/headline with line breaks for formatting. */
    title: string;
    /** Detailed description about the person and their expertise. */
    description: string;
  };

  /** Work/projects section content and labels. */
  work: {
    /** Section title displayed above the work grid. */
    title: string;
    /** Section description explaining the work philosophy. */
    description: string;
    /** Message displayed when no projects match search criteria. */
    noResults: string;
    /** Search bar configuration and labels. */
    searchBar: {
      /** Accessibility label for the search input. */
      label: string;
      /** Placeholder text displayed in the search input. */
      placeholder: string;
    };
    /** Project card configuration and accessibility labels. */
    card: {
      /** Accessibility labels for screen readers. */
      aria: {
        /** Label prefix for project card links. */
        leadingLabel: string;
        /** Label suffix for project card links. */
        trailingLabel: string;
      };
      /** Text displayed on the "view details" button. */
      viewDetails: string;
    };
    /** Pagination controls and labels. */
    pagination: {
      /** Accessibility label for previous page button. */
      previous: string;
      /** Accessibility label for page navigation buttons. */
      goToPage: string;
      /** Accessibility label for next page button. */
      next: string;
    };
  };

  /** Social section content and links configuration. */
  social: {
    /** Section title displayed above social links. */
    title: string;
    /** Section description encouraging contact and collaboration. */
    description: string;
    /** Array of social media and contact links. */
    links: {
      /** Accessibility label describing the link destination. */
      label: string;
      /** Icon class name for the social platform. */
      icon: string;
      /** URL to the social media profile or contact method. */
      link: string;
    }[];
  };

  /** Project details page specific content and labels. */
  projectDetails: {
    /** Text displayed on the back button. */
    backButton: string;
    /** Accessibility label for the close button. */
    closeButton: string;
    /** Label prefix for thumbnail image buttons. */
    thumbnailLabel: string;
  };

  /** 404 not found page content and labels. */
  notFound: {
    /** Main heading displayed on the not found page. */
    title: string;
    /** Descriptive message explaining the page wasn't found. */
    description: string;
    /** Text displayed on the go home button. */
    goHomeButton: string;
  };

  /** Footer section content. */
  footer: {
    /** Text displayed in the footer. */
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
