import './profile.styles.scss';

import type { Content } from '@/types/content';

export type ProfileProps = Content['profile'];

export function Profile(props: ProfileProps) {
  const { image, overline, title, description } = props;

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
