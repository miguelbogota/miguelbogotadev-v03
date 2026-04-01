import { type Content } from '../types/content';
import { type Project } from '../types/project';
import type { ThemeType } from '../types/theme';
import { RootRoute } from './root';

/** Project Route Props */
export type ProjectProps = {
  content: Content;
  project: Project;
  projects: Project[];
  theme: ThemeType;
};

/** Project Route */
export const ProjectRoute = ({ content, project, projects, theme }: ProjectProps) =>
  RootRoute({
    theme,
    content,
    projects,
    children: /*html*/ `<div>
      <h1>${project.displayName}</h1>
      <p>${project.summary}</p>
      <img src="${project.images[0]?.src || ''}" alt="${project.images[0]?.alt || project.displayName}" />
    </div>`,
  });
