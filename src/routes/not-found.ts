import { type Content } from '../types/content';
import type { ThemeType } from '../types/theme';
import { type Project } from '../types/project';
import { RootRoute } from './root';

/** Not Found Route Props */
export type NotFoundProps = {
  content: Content;
  projects: Project[];
  theme: ThemeType;
};

/** Not Found Route */
export const NotFoundRoute = ({ content, projects, theme }: NotFoundProps) =>
  RootRoute({
    theme,
    content,
    projects,
    children: /*html*/ `<div>Not Found</div>`,
  });
