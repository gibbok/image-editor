import { render, screen } from '@testing-library/react';
import { PropertiesPanel, PropertiesPanelProps } from './PropertiesPanel';

describe('PropertiesPanel', () => {
  const mockProps: PropertiesPanelProps = {
    imageId: '123',
    width: 100,
    height: 200,
    isGrayscale: true,
    blur: 2,
    onApply: jest.fn(),
    onDownload: jest.fn(),
  };
  it('renders correctly', () => {
    render(<PropertiesPanel {...mockProps} />);

    expect(
      screen.getByText(`Image Id: ${mockProps.imageId}`)
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Width')).toHaveValue(mockProps.width);
    expect(screen.getByLabelText('Height')).toHaveValue(mockProps.height);
    expect(screen.getByLabelText('Grayscale')).toBeChecked();
    expect(screen.getByLabelText('Blur')).toHaveValue(mockProps.blur);
    expect(screen.getByText('Apply')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
