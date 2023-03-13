import { pipe } from 'fp-ts/lib/function';
import { ImageSizes } from './pages/ImagesPage/useGetImages/type';

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

export const getBooleanFromQueryParamOrUseDefault = (
  valueParam: string | null
) => (valueParam === null ? false : valueParam === 'true');

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

// TODO improve unhappy path
export const extractImageSizesFromUrl = (str: string): ImageSizes => {
  const tokens = str.split('/').reverse();
  const [heightStr, widthStr] = tokens;

  return {
    width: Math.round(Number(widthStr)),
    height: Math.round(Number(heightStr)),
  };
};

export const modifySizeForImageUrl =
  (url: string) =>
  ({ width, height }: ImageSizes) =>
    url.replace(/\d+\/\d+$/, width + '/' + height);

export const appendGrayscale = (isGrayscale: boolean) => (url: string) =>
  `${url}${isGrayscale ? '&grayscale' : ''}`;

export const appendBlur = (blur: number) => (url: string) =>
  `${url}?blur=${blur}`;

export const makeUrlWithFitImageSizes = ({
  originalUrl,
  desiredSizes: desiredResize,
}: Readonly<{
  originalUrl: string;
  desiredSizes: ImageSizes;
}>) =>
  pipe(
    originalUrl,
    extractImageSizesFromUrl,
    calculateImageSizesAspectRatioFitImage(desiredResize),
    roundImageSizes,
    modifySizeForImageUrl(originalUrl)
  );

export const makeUrlWithSizesGrayscaleBlur =
  ({
    desiredSizes,
    isGrayscale,
    blur,
  }: Readonly<{
    desiredSizes: ImageSizes;
    isGrayscale: boolean;
    blur: number;
  }>) =>
  (originalUrl: string) =>
    pipe(
      desiredSizes,
      modifySizeForImageUrl(originalUrl),
      appendBlur(blur),
      appendGrayscale(isGrayscale)
    );
