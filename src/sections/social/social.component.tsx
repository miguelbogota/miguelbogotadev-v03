import './social.styles.scss';

/** Section renders the social information. */
type SocialLink = {
  label: string;
  icon: string;
  url: string;
};

/** Social links for the social section. */
const socialLinks: SocialLink[] = [
  {
    label: 'Email link',
    icon: 'bxf bx-envelope',
    url: 'mailto:contact@miguelbogota.dev',
  },
  {
    label: 'GitHub profile link',
    icon: 'bxl bx-github',
    url: 'https://github.com/miguelbogota',
  },
  {
    label: 'LinkedIn profile link',
    icon: 'bxl bx-linkedin-square',
    url: 'https://linkedin.com/in/miguelbogota',
  },
  {
    label: 'Instagram profile link',
    icon: 'bxl bx-instagram-alt',
    url: 'https://instagram.com/migue_bogota',
  },
];

/** Section renders the social information. */
export function SocialSection() {
  return (
    <section id="social">
      <div className="social-container">
        <div className="content">
          <h2>Find me Around the Web</h2>
          <p className="overline">
            Let's build something great together. Whether it's a new idea or an existing product,
            I'd be happy to help bring it to life with a focus on quality, performance, and user
            experience. Feel free to reach out via email or connect with me on social media—I'd love
            to hear about what you're working on.
          </p>

          <div className="social-networks">
            {socialLinks.map(({ label, icon, url }) => (
              <a
                className="social-link"
                key={label}
                href={url}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
