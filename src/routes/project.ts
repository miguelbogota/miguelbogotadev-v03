import { type Content } from '../types/content';
import { type Project } from '../types/project';
import type { ThemeType } from '../types/theme';
import { RootRoute } from './root';

/** Project Route Props */
export type ProjectProps = {
  content: Content;
  project: Project;
  theme: ThemeType;
};

/** Project Route */
export const ProjectRoute = ({ content, project, theme }: ProjectProps) =>
  RootRoute({
    theme,
    content,
    children: /*html*/ `<div>Home</div>`,
  });
