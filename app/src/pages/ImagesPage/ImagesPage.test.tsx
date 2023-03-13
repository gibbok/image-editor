import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultImagesUI } from '../../types-ui';
import { ImagesPage } from './ImagesPage';

const TEST_DATA: ResultImagesUI = {
  images: [
    {
      imageId: '0',
      author: 'Alejandro Escamilla',
      urlTransform: 'https://picsum.photos/id/0/330/220',
    },
    {
      imageId: '1',
      author: 'Alejandro Escamilla',
      urlTransform: 'https://picsum.photos/id/1/330/220',
    },
  ],
  pagination: 'next',
};

describe('ImagesPage', () => {
  it('should render', () => {
    const onNavigateToEidtor = jest.fn();
    const onChangePage = jest.fn();

    render(
      <ImagesPage
        status={'loaded'}
        data={TEST_DATA}
        page={1}
        onNavigateToEidtor={onNavigateToEidtor}
        onChangePage={onChangePage}
      />
    );

    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBe(2);
    expect(imgs[0]).toHaveAttribute(
      'src',
      'https://picsum.photos/id/0/330/220'
    );
    expect(imgs[1]).toHaveAttribute(
      'src',
      'https://picsum.photos/id/1/330/220'
    );

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    expect(screen.getByText(/page: 1/i)).toBeInTheDocument();

    expect(onNavigateToEidtor).not.toBeCalled();
    expect(onChangePage).not.toBeCalled();
  });

  it('should call callback go to editor when user selects an image', () => {
    const onNavigateToEidtor = jest.fn();
    const onChangePage = jest.fn();

    render(
      <ImagesPage
        status={'loaded'}
        data={TEST_DATA}
        page={1}
        onNavigateToEidtor={onNavigateToEidtor}
        onChangePage={onChangePage}
      />
    );

    userEvent.click(screen.getAllByRole('img')[0]);

    expect(onNavigateToEidtor).toBeCalled();
    expect(onChangePage).not.toBeCalled();
  });

  it('should call callback change page when user clicks next page', () => {
    const onNavigateToEidtor = jest.fn();
    const onChangePage = jest.fn();

    render(
      <ImagesPage
        status={'loaded'}
        data={TEST_DATA}
        page={1}
        onNavigateToEidtor={onNavigateToEidtor}
        onChangePage={onChangePage}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(onNavigateToEidtor).not.toBeCalled();
    expect(onChangePage).toBeCalledWith('next');
  });
});
