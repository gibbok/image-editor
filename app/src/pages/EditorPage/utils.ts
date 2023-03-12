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
} from '../../utils-urls';
import { ImageState } from './types';

export type EditorPageQueryParams = Readonly<{
  imageId: ImageId;
  page: number;
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: number;
}>;
export const makeEditorPageQueryParams = ({
  imageId,
  page,
  width,
  height,
  isGrayscale,
  blur,
}: Readonly<{
  imageId: ImageId;
  page: number;
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: number;
}>) =>
  `?${new URLSearchParams({
    imageId: imageId,
    page: page.toString(),
    width: width.toString(),
    height: height.toString(),
    grayscale: isGrayscale.toString(),
    blur: blur.toString(),
  })}`;

export type EditorQueryParams = ImageState &
  Readonly<{
    imageId: ImageId;
    page: number;
  }>;

export const getEditorPageQueryParams = (
  urlParams: URLSearchParams
): EditorQueryParams => {
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

export const isEditorPageQueryParamsSameAsImageState = (
  qp: EditorPageQueryParams,
  imageState: ImageState
) =>
  imageState.width === qp.width &&
  imageState.height === qp.height &&
  imageState.isGrayscale === qp.isGrayscale &&
  imageState.blur === qp.blur
    ? true
    : false;

export const makeUrlToImagesList = (page: number) => `/?page=${page}`;
