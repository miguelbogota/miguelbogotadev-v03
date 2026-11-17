/** Legacy project drawer retained until intercepted routing is introduced in Phase 5. */
export { Drawer, useDrawerNavigation, useDrawerRouting } from './components/drawer';

/** Project detail presentation shared by the drawer and canonical route. */
export { ProjectInfo, type ProjectInfoProps } from './components/project-info';

/** Project route failure presentation. */
export { ProjectError, type ProjectErrorProps } from './components/project-error';

/** Project metadata contract. */
export type { Project } from './types/project.type';
