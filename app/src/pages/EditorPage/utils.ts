import {
  API_MAX_IMAGE_SIZE,
  EDITOR_MIN_HEIGHT,
  EDITOR_MIN_WIDTH,
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
} from '../../config';
import { getIntNumberFromQueryParamOrUseDefault } from '../../utils';

export const makeEditorPageQueryParam = ({
  width,
  height,
  isGrayscale,
  blur,
}: Readonly<{
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: number;
}>) =>
  `?${new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    gray: isGrayscale.toString(),
    blur: blur.toString(),
  })}`;

export type EditorQueryParams = Readonly<{
  imageId: string;
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: number;
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
  )(urlParams.get('id')).toString();
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

  const gray = Boolean(urlParams.get('gray'));

  const blur = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    10
  )(urlParams.get('blur'));

  return {
    imageId,
    width,
    height,
    isGrayscale: gray,
    blur,
  };
};
