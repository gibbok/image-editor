import { pipe } from 'fp-ts/lib/function';
import { ImageSize } from './pages/ImagesPage/useGetImages/type';

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
type SourceImageSizes = ImageSize;
type MaxImageSizes = ImageSize; // TODO do not use aliases
type CalculateImageSizesAspectRatioFitImage = (
  maximumSizes: MaxImageSizes
) => (sourceSizes: SourceImageSizes) => ImageSize;
// TODO use singular everywhere, think about using inline types instead
export const calculateImageSizesAspectRatioFitImage: CalculateImageSizesAspectRatioFitImage =
  (maximumSizes) => (sourceSizes) => {
    const ratio = Math.min(
      maximumSizes.width / sourceSizes.width,
      maximumSizes.height / sourceSizes.height
    );

    return {
      width: sourceSizes.width * ratio, // TODO do rounding here
      height: sourceSizes.height * ratio,
    };
  };

//TODO maybe we do not need this fucntion
export const roundImageSizes = (sizes: ImageSize): ImageSize => ({
  width: Math.round(sizes.width),
  height: Math.round(sizes.height),
});

// TODO improve unhappy path
// TODO use singular
// TODO remove this code because I got this info from the api
export const extractImageSizesFromUrl = (str: string): ImageSize => {
  const tokens = str.split('/').reverse();
  const [heightStr, widthStr] = tokens;

  return {
    width: Math.round(Number(widthStr)), // TODO rounding should not needed
    height: Math.round(Number(heightStr)),
  };
};

// TODO use token instead in a common function utils
// TODO I can create a new url because I have this info from the api, so I can remove this code
export const modifySizeForImageUrl =
  (url: string) =>
  ({ width, height }: ImageSize) =>
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
  desiredSizes: ImageSize;
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
    desiredSizes: ImageSize;
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
