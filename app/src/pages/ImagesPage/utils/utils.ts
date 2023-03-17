import { schemaPage } from '../../EditorPage/schema';
import { EditorPageQueryParams } from '../../EditorPage/utils/utils';

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
  const { page } = schemaPage.validateSync({
    page: urlParams.get('page') ?? 1,
  });

  return {
    page,
  };
};
