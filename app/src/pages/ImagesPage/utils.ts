import { ImageId } from '../../types-ui';
import { getIntNumberFromQueryParamOrUseDefault } from '../../utils';

export const makeEditorUrl = (
  imageId: ImageId,
  page: number,
  width: number,
  height: number
) =>
  `editor?imageId=${imageId}&page=${page}&width=${width}&height=${height}&grayscale=false&blur=1`; // TODO make it configurable

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
