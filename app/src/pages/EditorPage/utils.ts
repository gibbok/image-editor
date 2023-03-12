import {
  API_MAX_IMAGE_SIZE,
  EDITOR_MIN_HEIGHT,
  EDITOR_MIN_WIDTH,
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
} from '../../config';
import { ImageId } from '../../types-ui';
import {
  getBooleanFromQueryParamOrUseDefault,
  getIntNumberFromQueryParamOrUseDefault,
} from '../../utils';
import { ImagePropertiesForChange } from './types';

export const makeEditorPageQueryParam = ({
  imageId,
  width,
  height,
  isGrayscale,
  blur,
}: Readonly<{
  imageId: ImageId;
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: number;
}>) =>
  `?${new URLSearchParams({
    imageId: imageId,
    width: width.toString(),
    height: height.toString(),
    grayscale: isGrayscale.toString(),
    blur: blur.toString(),
  })}`;

export type EditorQueryParams = ImagePropertiesForChange &
  Readonly<{
    imageId: ImageId;
  }>;

export const getImageIdFromImageIdQueryParam = (imageIdStr: string | null) => {
  const DEFAULT_IMAGE_ID = '1';
  if (imageIdStr === null) {
    return DEFAULT_IMAGE_ID;
  }
  return imageIdStr;
};

// TODO add test
export const getEditorPageQueryParams = (
  urlParams: URLSearchParams
): EditorQueryParams => {
  const imageId = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    Number.MAX_SAFE_INTEGER
  )(urlParams.get('imageId')).toString();
  const width = getIntNumberFromQueryParamOrUseDefault(
    EDITOR_PREVIEW_INIT_WIDTH,
    EDITOR_MIN_WIDTH,
    API_MAX_IMAGE_SIZE
  )(urlParams.get('width'));

  const height = getIntNumberFromQueryParamOrUseDefault(
    EDITOR_PREVIEW_INIT_HEIGHT,
    EDITOR_MIN_HEIGHT,
    API_MAX_IMAGE_SIZE
  )(urlParams.get('height'));

  const isGrayscale = getBooleanFromQueryParamOrUseDefault(false)(
    urlParams.get('grayscale')
  );

  const blur = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    10
  )(urlParams.get('blur'));

  return {
    imageId,
    width,
    height,
    isGrayscale,
    blur,
  };
};
