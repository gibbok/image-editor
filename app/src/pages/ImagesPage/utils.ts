import { ImageId } from '../../types-ui';
import { getIntNumberFromQueryParamOrUseDefault } from '../../utils';

export const makeEditorUrl = (imageId: ImageId, page: number) =>
  `editor?imageId=${imageId}&page=${page}&width=800&height=600&grayscale=false&blur=1`; // TODO make it configurable

export const makePageQueryParam = (page: number) =>
  `?${new URLSearchParams({ page: page.toString() })}`;

export const getQueryParamsForImagesPage = (
  urlParams: URLSearchParams
): Readonly<{ page: number }> => {
  const page = getIntNumberFromQueryParamOrUseDefault(
    1,
    1,
    Number.MAX_SAFE_INTEGER
  )(urlParams.get('page'));

  return { page };
};
