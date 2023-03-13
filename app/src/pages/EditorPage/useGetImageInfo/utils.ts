import { pipe } from 'fp-ts/lib/function';
import { calculateImageSizeAspectRatioFitImage } from '../../../utils';
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
