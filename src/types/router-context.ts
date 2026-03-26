import type { Content } from './content';
import type { Project } from './project';

export interface RouterContext {
  content: Content;
  projects: Project[];
}
