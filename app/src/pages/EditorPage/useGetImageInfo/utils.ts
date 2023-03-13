import { pipe } from 'fp-ts/lib/function';
import {
  calculateImageSizesAspectRatioFitImage,
  extractImageSizesFromUrl,
  roundImageSizes,
} from '../../../utils-urls';
import { ImageSize } from '../../ImagesPage/useGetImages/type';

export const calculateImageSizeForPreviewImage = (
  url: string,
  desiredWidth: number,
  desiredHeight: number
): ImageSize =>
  pipe(
    url,
    extractImageSizesFromUrl,
    calculateImageSizesAspectRatioFitImage({
      width: desiredWidth,
      height: desiredHeight,
    }),
    roundImageSizes
  );
