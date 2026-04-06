import { render } from '@/testing';
import { Container } from './container.component';

describe('components / Container', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Container>Test</Container>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render container with the given tag', () => {
    const { baseElement } = render(<Container as="section">Test</Container>);
    expect(baseElement).toMatchSnapshot();
  });
});
