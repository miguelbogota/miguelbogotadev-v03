import { fireEvent, projectFixture, render, screen } from '@/testing';

import { InitiativeAccordion } from './initiative-accordion.component';

const initiativeContent = [
  { id: 'architecture', markdown: '## Architecture details\n\nBuilt for independent teams.' },
  { id: 'delivery', markdown: '## Delivery details\n\nReleased through controlled stages.' },
];

describe('InitiativeAccordion', () => {
  it('should keep only one fully loaded initiative open at a time', () => {
    render(
      <InitiativeAccordion
        initiatives={projectFixture.initiatives}
        content={initiativeContent}
      />,
    );

    const architectureButton = screen.getByRole('button', { name: /Platform Architecture/ });
    const deliveryButton = screen.getByRole('button', { name: /Progressive Delivery/ });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(architectureButton).toHaveAttribute('aria-expanded', 'false');
    expect(deliveryButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Built for independent teams.')).not.toBeVisible();

    fireEvent.click(architectureButton);

    expect(architectureButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Built for independent teams.')).toBeInTheDocument();

    fireEvent.click(deliveryButton);

    expect(architectureButton).toHaveAttribute('aria-expanded', 'false');
    expect(deliveryButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Built for independent teams.')).not.toBeVisible();
    expect(screen.getByText('Released through controlled stages.')).toBeInTheDocument();
  });

  it('should move the next initiative heading into reading position when switching panels', () => {
    const scrollIntoView = vi.fn();
    const animationFrame = vi.spyOn(window, 'requestAnimationFrame');

    render(
      <InitiativeAccordion
        initiatives={projectFixture.initiatives}
        content={initiativeContent}
      />,
    );

    const architectureButton = screen.getByRole('button', { name: /Platform Architecture/ });
    const deliveryButton = screen.getByRole('button', { name: /Progressive Delivery/ });

    Object.defineProperty(deliveryButton, 'scrollIntoView', { value: scrollIntoView });

    fireEvent.click(architectureButton);
    fireEvent.click(deliveryButton);

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(animationFrame).not.toHaveBeenCalled();

    animationFrame.mockRestore();
  });

  it('should reposition immediately when reduced motion is preferred', () => {
    const scrollIntoView = vi.fn();

    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true }),
    );

    render(
      <InitiativeAccordion
        initiatives={projectFixture.initiatives}
        content={initiativeContent}
      />,
    );

    const architectureButton = screen.getByRole('button', { name: /Platform Architecture/ });
    const deliveryButton = screen.getByRole('button', { name: /Progressive Delivery/ });

    Object.defineProperty(deliveryButton, 'scrollIntoView', { value: scrollIntoView });

    fireEvent.click(architectureButton);
    fireEvent.click(deliveryButton);

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });

    vi.unstubAllGlobals();
  });
});
