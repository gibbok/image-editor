import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

describe('ImagesPage', () => {
  it('should render', () => {
    render(<Layout title="Title">children</Layout>);

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
