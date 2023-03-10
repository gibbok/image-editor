import { Images } from '../../../types-api';
import { ImagesUI, PaginationMoveState } from '../../../types-ui';
import { ImageSizes } from './type';
import { pipe } from 'fp-ts/lib/function';

/**
 * Conserve aspect ratio of the original region.
 * Use it when shrinking/enlarging images to fit into an area.
 */

type SourceImageSizes = ImageSizes;
type MaxImageSizes = ImageSizes;
type CalculateImageSizesAspectRatioFitImage = (
  maximumSizes: MaxImageSizes
) => (sourceSizes: SourceImageSizes) => ImageSizes;
export const calculateImageSizesAspectRatioFitImage: CalculateImageSizesAspectRatioFitImage =
  (maximumSizes) => (sourceSizes) => {
    const ratio = Math.min(
      maximumSizes.width / sourceSizes.width,
      maximumSizes.height / sourceSizes.height
    );

    return {
      width: sourceSizes.width * ratio,
      height: sourceSizes.height * ratio,
    };
  };
export const roundImageSizes = (sizes: ImageSizes): ImageSizes => ({
  width: Math.round(sizes.width),
  height: Math.round(sizes.height),
});

export const extractImageSizesFromUrl = (str: string): ImageSizes => {
  const tokens = str.split('/').reverse();
  const [heightStr, widthStr] = tokens;

  return {
    width: Math.round(Number(widthStr)),
    height: Math.round(Number(heightStr)), // TODO in case of error fallback to default value
  };
};

export const modifySizeForImageUrl =
  (url: string) =>
  ({ width, height }: ImageSizes) =>
    url.replace(/\d+\/\d+$/, width + '/' + height);

export const tranformResponseForUI = (
  response: Images,
  desiredResize: ImageSizes
): ImagesUI =>
  response.map(({ id, author, download_url }) => {
    const urlResized = pipe(
      download_url,
      extractImageSizesFromUrl,
      calculateImageSizesAspectRatioFitImage(desiredResize),
      roundImageSizes,
      modifySizeForImageUrl(download_url)
    );

    return {
      id,
      author,
      urlResized,
    };
  });

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
