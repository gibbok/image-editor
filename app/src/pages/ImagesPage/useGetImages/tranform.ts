import { Images } from '../../../types-api';
import { ImagesUI, PaginationMoveState } from '../../../types-ui';
import { makeUrlWithFitImageSize } from '../../../utils-urls';
import { ImageSize } from './type';

// TODO use better naming
export const tranformResponseForUI = (
  response: Images,
  desiredSize: ImageSize // TODO rename to singular
): ImagesUI =>
  response.map(({ id, author, download_url, width, height }) => ({
    imageId: id,
    author,
    urlTransform: makeUrlWithFitImageSize({
      currentSize: { width, height },
      originalUrl: download_url,
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
