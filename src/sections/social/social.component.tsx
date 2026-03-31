import type { Content } from '@/types/content';
import './social.styles.scss';

export type SocialProps = Content['social'];

export function Social(props: SocialProps) {
  const { title, description, links } = props;

  return (
    <section id="social">
      <div className="social-container">
        <div className="content">
          <h2>{title}</h2>
          <p className="overline">{description}</p>

          <div className="social-networks">
            {links.map(({ label, icon, link }) => (
              <a
                className="social-link"
                key={label}
                href={link}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
