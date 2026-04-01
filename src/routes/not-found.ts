import { type Content } from '../types/content';
import type { ThemeType } from '../types/theme';
import { RootRoute } from './root';

/** Not Found Route Props */
export type NotFoundProps = {
  content: Content;
  theme: ThemeType;
};

/** Not Found Route */
export const NotFoundRoute = ({ content, theme }: NotFoundProps) =>
  RootRoute({
    theme,
    content,
    children: /*html*/ `<div>Not Found</div>`,
  });
