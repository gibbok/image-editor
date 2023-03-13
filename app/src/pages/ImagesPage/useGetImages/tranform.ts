import { Images } from '../../../types-api';
import { ImagesUI, PaginationMoveState } from '../../../types-ui';
import { makeUrlWithFitImageSizes } from '../../../utils-urls';
import { ImageSizes } from './type';

// TODO use better naming
export const tranformResponseForUI = (
  response: Images,
  desiredResize: ImageSizes // TODO rename to singular
): ImagesUI =>
  response.map(({ id, author, download_url }) => ({
    imageId: id,
    author,
    urlTransform: makeUrlWithFitImageSizes({
      originalUrl: download_url,
      desiredSizes: desiredResize, // TODO rename to singluar, do not use an object
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
