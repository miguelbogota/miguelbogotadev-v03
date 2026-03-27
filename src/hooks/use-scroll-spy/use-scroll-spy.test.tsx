import { render, screen, fireEvent, act } from '@testing-library/react';
import { useScrollSpy } from './use-scroll-spy.hook';

/** Testing component. */
function TestComponent({ ids }: { ids: string[] }) {
  const active = useScrollSpy({ ids, offset: 0 });

  return <div data-testid="active">{active}</div>;
}

/** Mocks the rect to get the bounds of the component and calculate the scroll active section. */
function createMockRect(start: number, height: number) {
  return () => {
    const scroll = window.scrollY;

    return {
      top: start - scroll,
      bottom: start + height - scroll,
      left: 0,
      right: 0,
      width: 0,
      height,
      x: 0,
      y: 0,
      toJSON: () => {},
    };
  };
}

describe('hook / useScrollSpy', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('should return an empty string when no section is active', () => {
    render(<TestComponent ids={['a', 'b']} />);
    expect(screen.getByTestId('active').textContent).toBe('');
  });

  it('should detect the active section based on scroll position', () => {
    const section = document.createElement('div');
    section.id = 'section-1';

    section.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      bottom: 100,
      left: 0,
      right: 0,
      width: 0,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    document.body.appendChild(section);

    window.scrollY = 50;

    render(<TestComponent ids={['section-1']} />);

    expect(screen.getByTestId('active').textContent).toBe('section-1');
  });

  it('should update the active section on scroll', () => {
    const section1 = document.createElement('div');
    section1.id = 'section-1';
    section1.getBoundingClientRect = createMockRect(0, 100);

    const section2 = document.createElement('div');
    section2.id = 'section-2';
    section2.getBoundingClientRect = createMockRect(100, 100);

    document.body.appendChild(section1);
    document.body.appendChild(section2);

    render(<TestComponent ids={['section-1', 'section-2']} />);

    act(() => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId('active').textContent).toBe('section-1');

    act(() => {
      window.scrollY = 150;
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId('active').textContent).toBe('section-2');
  });
});
