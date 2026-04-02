import { render, screen } from '@/testing';
import { ProfileSection } from './profile.component';

describe('sections / Profile', () => {
  it('should render correctly', () => {
    render(<ProfileSection />);

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });
});
