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
  logError,
} from '../../utils';
import { ImageChanges } from './types';

export type EditorPageQueryParams = ImageChanges &
  Readonly<{
    imageId: ImageId;
    page: number;
  }>;

export const makeEditorPageQueryParams = ({
  imageId,
  page,
  width,
  height,
  isGrayscale,
  blur,
}: EditorPageQueryParams) =>
  `?${new URLSearchParams({
    imageId: imageId,
    page: page.toString(),
    width: width.toString(),
    height: height.toString(),
    grayscale: isGrayscale.toString(),
    blur: blur.toString(),
  })}`;

export const getEditorPageQueryParams = (
  urlParams: URLSearchParams
): EditorPageQueryParams => {
  const imageId = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    Number.MAX_SAFE_INTEGER
  )(urlParams.get('imageId')).toString();

  const page = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    Number.MAX_SAFE_INTEGER
  )(urlParams.get('page'));

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

  const isGrayscale = getBooleanFromQueryParamOrUseDefault(
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
    page,
  };
};

export const makeUrlToImagesList = (page: number) => `/?page=${page}`;

const toDataUrl = async (url: string) => {
  const blob = await fetch(url).then((res) => res.blob());
  return URL.createObjectURL(blob);
};

export const downloadImage = (url: string) => async (nameFile: string) => {
  try {
    const a = document.createElement('a');
    a.href = await toDataUrl(url);
    a.download = nameFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    logError(e);
  }
};

export const makeFileName =
  (prefix: string) =>
  ({
    imageId,
    width,
    height,
    isGrayscale,
    blur,
  }: ImageChanges & Readonly<{ imageId: ImageId }>) =>
    `${prefix}-${imageId}-width-${width}-height-${height}${
      isGrayscale ? '-grayscale' : ''
    }-blur-${blur}`;
