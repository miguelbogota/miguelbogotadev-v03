import { render, screen } from '@/testing';
import { API_URL } from '@/server-actions/constants';
import { ProfileSection } from './profile.component';

vi.mock('@/components/cat-model', () => ({
  CatModel: () => <div data-testid="cat-model" />,
}));

describe('sections / Profile', () => {
  it('should render correctly', () => {
    render(<ProfileSection />);

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: "Miguel Bogota's profile picture" })).toHaveAttribute(
      'src',
      `${API_URL}/assets/profile.png`,
    );
  });

  it('should show the cat model in the pet area', () => {
    render(<ProfileSection />);

    expect(screen.getByTestId('cat-model')).toBeInTheDocument();
  });
});
