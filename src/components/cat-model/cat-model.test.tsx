import { act, fireEvent, render, screen } from '@/testing';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CatModel } from './cat-model.component';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cat-canvas">{children}</div>
  ),
  useFrame: vi.fn(),
  useLoader: vi.fn(() => ({ scene: {} })),
}));

describe('components / CatModel', () => {
  afterEach(() => {
    vi.mocked(useLoader).mockReset();
    vi.mocked(useLoader).mockReturnValue({ scene: {} } as never);
    vi.restoreAllMocks();
  });

  it('should load one cat after mount', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    await act(async () => {
      render(<CatModel />);
    });

    expect(screen.getByRole('group', { name: 'June 3D model' })).toBeInTheDocument();
    expect(screen.getByTestId('cat-canvas')).toBeInTheDocument();
    expect(useLoader).toHaveBeenCalledWith(GLTFLoader, expect.stringMatching(/june\.glb$/));
    expect(screen.getByText('Drag to rotate')).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('should hide rotation hints while the model is loading', async () => {
    let finishLoading!: () => void;
    const loading = new Promise<void>((resolve) => {
      finishLoading = resolve;
    });
    let isLoading = true;

    vi.mocked(useLoader).mockImplementation(() => {
      if (isLoading) throw loading;
      return { scene: {} } as never;
    });

    await act(async () => {
      render(<CatModel />);
    });

    expect(screen.queryByText('Drag to rotate')).not.toBeInTheDocument();
    expect(screen.queryByText('Double tap to rotate')).not.toBeInTheDocument();

    await act(async () => {
      isLoading = false;
      finishLoading();
      await loading;
    });

    expect(screen.getByText('Drag to rotate')).toBeInTheDocument();
    expect(screen.getByText('Double tap to rotate')).toBeInTheDocument();
  });

  it('should not show rotation hints when the model fails to load', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(useLoader).mockImplementation(() => {
      throw new Error('GLB failed to load');
    });

    await act(async () => {
      render(<CatModel />);
    });

    expect(screen.queryByText('Drag to rotate')).not.toBeInTheDocument();
    expect(screen.queryByText('Double tap to rotate')).not.toBeInTheDocument();
  });

  it('should require a double tap before touch rotation is enabled', async () => {
    await act(async () => {
      render(<CatModel />);
    });

    const viewer = screen.getByRole('group');
    expect(viewer).toHaveAttribute('data-touch-enabled', 'false');

    vi.setSystemTime(1000);
    fireEvent.pointerDown(viewer, { pointerType: 'touch', pointerId: 1 });
    expect(viewer).toHaveAttribute('data-touch-enabled', 'false');

    vi.setSystemTime(1200);
    fireEvent.pointerDown(viewer, { pointerType: 'touch', pointerId: 2 });
    expect(viewer).toHaveAttribute('data-touch-enabled', 'true');
  });
});
