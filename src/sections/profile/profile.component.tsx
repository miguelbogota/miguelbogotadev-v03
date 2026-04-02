import { useAppState } from '@/state';
import './profile.styles.scss';

/** Section renders the profile information. */
export function ProfileSection() {
  const {
    content: {
      profile: { image, overline, title, description },
    },
  } = useAppState();

  return (
    <section id="profile">
      <div className="profile-container">
        <div className="information">
          <img src={image.url} alt={image.alt} />

          <p>{overline}</p>

          <h1>
            {title.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p className="overline">{description}</p>
        </div>

        <div className="pet"></div>
      </div>
    </section>
  );
}
