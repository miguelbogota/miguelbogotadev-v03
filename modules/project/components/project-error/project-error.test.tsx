import { render, screen } from '@/testing';

import { ProjectError } from './project-error.component';

describe('projects / ProjectError', () => {
  it('should render recovery copy and the portfolio link', () => {
    render(
      <ProjectError
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
