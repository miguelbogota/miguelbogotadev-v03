import type { Project } from '@/modules/projects';
import type { Theme } from '@/modules/theme';

declare global {
  interface Window {
    /** App global state to share data between server and client. */
    __STATE__: {
      /** Current URL of the page. */
      url: string;
      /** Current theme of the application. */
      theme: Theme;
      /** Projects array containing all the projects. */
      projects: Project[];
    };
  }
}

export {};
