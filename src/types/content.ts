export interface Content {
  logoName: string;
  links: { id: string; label: string }[];
  externalLink: { href: string; label: string };
  footer: string;
}
