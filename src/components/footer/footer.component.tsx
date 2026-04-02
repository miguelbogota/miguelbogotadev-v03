import { useAppState } from '@/state';
import './footer.styles.scss';

/** Footer component with some basic text. */
export function Footer() {
  const {
    content: {
      footer: { text },
    },
  } = useAppState();

  return <footer>{text}</footer>;
}
