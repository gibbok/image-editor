import { Images } from '../../../types-api';
import { ImagesUI, PaginationMoveState } from '../../../types-ui';
import { ImageSizes } from './type';

/**
 * Conserve aspect ratio of the original region.
 * Useful when shrinking/enlarging images to fit into a certain area.
 */
export const calculateImageSizesAspectRatioFitImage = (
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): ImageSizes => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

export const modifySizeForImageUrl = (
  url: string,
  { width, height }: ImageSizes
) => url.replace(/\d+\/\d+$/, width + '/' + height);

export const tranformResponseForUI = (
  response: Images,
  desiredResize: ImageSizes
): ImagesUI =>
  response.map(({ id, author, download_url }) => ({
    id,
    author,
    urlResized: modifySizeForImageUrl(download_url, desiredResize),
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
