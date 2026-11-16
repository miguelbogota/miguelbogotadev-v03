/** Legacy project drawer retained until intercepted routing is introduced in Phase 5. */
export { Drawer, useDrawerNavigation, useDrawerRouting } from './components/drawer';

/** Project detail presentation shared by the drawer and future canonical route. */
export { ProjectInfo, type ProjectInfoProps } from './components/project-info';

/** Shared project access instance. */
export { projectsService } from './services/projects.service';

/** Project metadata contract. */
export type { Project } from './types/project.type';
