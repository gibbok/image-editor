import { ImageId } from '../../../types-ui';
import { logError } from '../../../utils';
import { ImageChanges } from '../types';
import { schema } from '../PropertiesPanel/schema-form';
import * as yup from 'yup';

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

export const schema2 = yup.object({
  imageId: yup
    .string()
    .required()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .default('1'),
  page: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .default(1),
});

export const getEditorPageQueryParams = (
  urlParams: URLSearchParams
): EditorPageQueryParams => {
  const { imageId, page, width, height, isGrayscale, blur } = schema
    .concat(schema2)
    .validateSync({
      imageId: urlParams.get('imageId'),
      page: urlParams.get('page'),
      width: urlParams.get('width'),
      height: urlParams.get('height'),
      isGrayscale: urlParams.get('grayscale'),
      blur: urlParams.get('blur'),
    });

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
