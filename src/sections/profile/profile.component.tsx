import './profile.styles.scss';

import { CatModel } from '@/components/cat-model';
import { API_URL } from '@/server-actions/constants';

/** Section renders the profile information. */
export function ProfileSection() {
  return (
    <section id="profile">
      <div className="profile-container">
        <div className="information">
          <img src={`${API_URL}/assets/profile.png`} alt="Miguel Bogota's profile picture" />

          <p>Hi, I'm Miguel Bogota</p>

          <h1>
            <span>Senior Software Engineer</span>
            <span>Building AI-Enhanced Systems</span>
            <span>And Product Design</span>
          </h1>

          <p className="overline">
            Senior software engineer building scalable, high-impact products with a sharp focus on
            performance, design, and clean architecture. I enjoy turning complex ideas into
            intuitive experiences, and I'm currently exploring how AI can power smarter, more
            adaptive applications (and still a fan of cats 🐱).
          </p>
        </div>

        <div className="pet">
          <CatModel />
        </div>
      </div>
    </section>
  );
}
