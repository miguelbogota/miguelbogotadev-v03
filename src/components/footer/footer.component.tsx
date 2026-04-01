import './footer.styles.scss';

/** Props for the footer. */
export interface FooterProps {
  text: string;
}

/** Footer component with some basic text. */
export function Footer(props: FooterProps) {
  const { text } = props;

  return <footer>{text}</footer>;
}
