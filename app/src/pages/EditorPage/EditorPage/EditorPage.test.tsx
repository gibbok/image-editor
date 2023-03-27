import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorPage, EditorPageLoaded } from './EditorPage';

const data: EditorPageLoaded = {
  status: 'loaded',
  data: {
    imageId: 'test-id',
    width: 800,
    height: 600,
    isGrayscale: false,
    blur: 0,
    urlTransform: 'url',
    author: 'Tom'
  },
  onDownload: jest.fn(),
  onApply: jest.fn(),
  onGoBackToImagesList: jest.fn(),
};

describe('EditorPage', () => {
  it('renders the properties panel, image, and go back button when in loaded state', () => {
    render(<EditorPage {...data} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Go to Image List')).toBeInTheDocument();
  });

  it('calls the onGoBackToImagesList function when the go back button is clicked', () => {
    render(<EditorPage {...data} />);

    userEvent.click( screen.getByText('Go to Image List'));
    expect(data.onGoBackToImagesList).toHaveBeenCalled();
  });
});