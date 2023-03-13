import { getIntNumberFromQueryParamOrUseDefault } from '../../utils';
import { EditorPageQueryParams } from '../EditorPage/utils';

export const makeEditorUrl = ({
  imageId,
  page,
  width,
  height,
  isGrayscale,
  blur,
}: EditorPageQueryParams) =>
  `editor?imageId=${imageId}&page=${page}&width=${width}&height=${height}&grayscale=${isGrayscale}&blur=${blur}`;

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
