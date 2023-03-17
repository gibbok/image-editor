import { pipe } from 'fp-ts/lib/function';
import { API_BASE_URL } from './config';
import { ImageSize } from './pages/ImagesPage/useGetImages/type';
import { ImageId } from './types-ui';

// TODO remove me
export const getIntNumberFromQueryParamOrUseDefault =
  (defaultValue: number, minValue: number, maxValue: number) =>
  (valueParam: string | null) => {
    if (valueParam === null) {
      return defaultValue;
    }
    const value = Number(valueParam);
    if (
      Number.isNaN(value) ||
      !Number.isInteger(value) ||
      value < minValue ||
      value > maxValue
    ) {
      return defaultValue;
    }
    return value;
  };

/**
 * Conserve aspect ratio of the original region.
 * Use it when shrinking/enlarging images to fit into an area.
 */
export const calculateImageSizeAspectRatioFitImage =
  (maximumSizes: ImageSize) =>
  (sourceSizes: ImageSize): ImageSize => {
    const ratio = Math.min(
      maximumSizes.width / sourceSizes.width,
      maximumSizes.height / sourceSizes.height
    );

    return {
      width: Math.round(sourceSizes.width * ratio),
      height: Math.round(sourceSizes.height * ratio),
    };
  };

export const baseMakeUrlForImage =
  (apiBaseUrl: string) =>
  (imageId: string) =>
  ({ width, height }: ImageSize) =>
    `${apiBaseUrl}id/${imageId}/${width}/${height}`;

export const makeUrlForImage = baseMakeUrlForImage(API_BASE_URL);

export const appendGrayscale = (isGrayscale: boolean) => (url: string) =>
  `${url}${isGrayscale ? '&grayscale' : ''}`;

export const appendBlur = (blur: number) => (url: string) =>
  `${url}?blur=${blur}`;

export const makeUrlWithFitImageSize = ({
  imageId,
  currentSize,
  desiredSize,
}: Readonly<{
  imageId: ImageId;
  currentSize: ImageSize;
  desiredSize: ImageSize;
}>) => pipe(desiredSize, makeUrlForImage(imageId));

export const makeUrlWithSizeGrayscaleBlur =
  ({
    desiredSize,
    isGrayscale,
    blur,
  }: Readonly<{
    desiredSize: ImageSize;
    isGrayscale: boolean;
    blur: number;
  }>) =>
  (imageId: ImageId) =>
    pipe(
      desiredSize,
      makeUrlForImage(imageId),
      appendBlur(blur),
      appendGrayscale(isGrayscale)
    );

// TODO log errors to an external system or use an error tracking tool like Sentry
export const logError = (...args: unknown[]) => console.error(args);
