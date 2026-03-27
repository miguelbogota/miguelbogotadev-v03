import './footer.styles.scss';

/**
 * Props for the footer.
 */
export interface FooterProps {
  text: string;
}

/**
 * Footer component with default text "Designed & Built by Miguel Bogota".
 */
export function Footer(props: FooterProps) {
  const { text } = props;

  return <footer>{text}</footer>;
}
