import { useAppState } from '@/state';
import './social.styles.scss';

/** Section renders the social information. */
export function SocialSection() {
  const {
    content: {
      social: { title, description, links },
    },
  } = useAppState();

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
