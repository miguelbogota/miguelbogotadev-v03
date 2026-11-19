import { render, screen } from '@/testing';

import { ErrorPage } from './error-page.component';

describe('components / ErrorPage', () => {
  it('should render recovery copy and actions', () => {
    render(
      <ErrorPage
        title="Project not found"
        message="This project is not available."
        action={<button>Try again</button>}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Project not found' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to the portfolio' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
