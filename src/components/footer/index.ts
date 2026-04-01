import type { Content } from '../../types/content';

/** Props for the footer. */
export type FooterProps = Content['footer'];

/** Footer component. */
export function Footer({ text }: FooterProps) {
  return /*html */ `<footer>${text}</footer>`;
}
