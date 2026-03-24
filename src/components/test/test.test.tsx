import { TestComponent } from './test';

import { render } from '@testing-library/react';

describe('TestComponent', () => {
  it('should render correctly', () => {
    const { container } = render(<TestComponent />);
    expect(container).toMatchSnapshot();
  });
});
