import { ImagesUI } from '../../types-ui';

export type PaginationMove = 'prev' | 'next';

export type PaginationMoveState = PaginationMove | 'prev-next' | 'none';

export type ResultImagesUI = Readonly<{
  images: ImagesUI;
  pagination: PaginationMoveState;
}>;
