import { pipe } from 'fp-ts/lib/function';
import {
  calculateImageSizesAspectRatioFitImage,
  extractImageSizesFromUrl,
  roundImageSizes,
} from '../../ImagesPage/useGetImages/tranform';
import { ImageSizes } from '../../ImagesPage/useGetImages/type';

export const calculateImageSizeForPreviewImage = (
  url: string,
  desiredWidth: number,
  desiredHeight: number
): ImageSizes =>
  pipe(
    url,
    extractImageSizesFromUrl,
    calculateImageSizesAspectRatioFitImage({
      width: desiredWidth,
      height: desiredHeight,
    }),
    roundImageSizes
  );
