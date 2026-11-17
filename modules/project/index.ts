/** Project drawer and its lightweight browser-history navigation. */
export { Drawer, useDrawerNavigation, useDrawerRouting } from './components/drawer';

/** Project detail presentation shared by the drawer and canonical route. */
export { ProjectInfo, type ProjectInfoProps } from './components/project-info';

/** Project route failure presentation. */
export { ProjectError, type ProjectErrorProps } from './components/project-error';

/** Project metadata contract. */
export type { Project } from './types/project.type';
