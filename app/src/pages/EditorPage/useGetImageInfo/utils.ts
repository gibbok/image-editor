import { pipe } from 'fp-ts/lib/function';
import { calculateImageSizeAspectRatioFitImage } from '../../../utils-urls';
import { ImageSize } from '../../ImagesPage/useGetImages/type';

export const calculateImageSizeForPreviewImage = (
  width: number,
  height: number,
  desiredWidth: number,
  desiredHeight: number
): ImageSize =>
  pipe(
    { width, height },
    calculateImageSizeAspectRatioFitImage({
      width: desiredWidth,
      height: desiredHeight,
    })
  );
