import { Images } from '../../../types-api';
import { ImagesUI } from '../../../types-ui';
import { makeUrlWithFitImageSize } from '../../../utils';
import { PaginationMoveState } from '../types';
import { ImageSize } from './type';

export const tranformResponseForUI = (
  images: Images,
  desiredSize: ImageSize
): ImagesUI =>
  images.map(({ id, author, width, height }) => ({
    imageId: id,
    author,
    urlTransform: makeUrlWithFitImageSize({
      currentSize: { width, height },
      imageId: id,
      desiredSize,
    }),
  }));

export const getPaginationInfoFromHeader = (
  header: string
): PaginationMoveState => {
  const hasPrev = header.includes('rel="prev"');
  const hasNext = header.includes('rel="next"');
  if (hasPrev && hasNext) {
    return 'prev-next';
  }
  if (hasPrev && !hasNext) {
    return 'prev';
  }
  if (!hasPrev && hasNext) {
    return 'next';
  }

  return 'none';
};
