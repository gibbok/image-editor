import {
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
} from '../../config';
import { ImageId } from '../../types-ui';
import { getIntNumberFromQueryParamOrUseDefault } from '../../utils-urls';

export const makeEditorUrl = (imageId: ImageId, page: number) =>
  `editor?imageId=${imageId}&page=${page}&width=${EDITOR_PREVIEW_INIT_WIDTH}&height=${EDITOR_PREVIEW_INIT_HEIGHT}&grayscale=false&blur=1`; // TODO make it configurable

export const makeImagesPageQueryParams = (page: number) =>
  `?${new URLSearchParams({ page: page.toString() })}`;

export const getImagesPageQueryParams = (
  urlParams: URLSearchParams
): Readonly<{ page: number }> => {
  const page = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    Number.MAX_SAFE_INTEGER
  )(urlParams.get('page'));

  return { page };
};
