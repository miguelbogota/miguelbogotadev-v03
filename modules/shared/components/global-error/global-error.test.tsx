import { fireEvent } from '@testing-library/react';

import { render, screen } from '@/testing';

import { GlobalError } from './global-error.component';

vi.mock('@/modules/analytics/services/analytics.service', () => ({
  analyticsService: { trackException: vi.fn() },
}));

describe('components / GlobalError', () => {
  it('should offer a retry action without exposing error details', () => {
    const reset = vi.fn();

    render(<GlobalError error={new Error('Sensitive failure')} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(reset).toHaveBeenCalledOnce();
    expect(screen.queryByText('Sensitive failure')).not.toBeInTheDocument();
  });
});
