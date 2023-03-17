import {
  EDITOR_MAX_BLUR,
  EDITOR_MAX_HEIGHT,
  EDITOR_MAX_WIDTH,
  EDITOR_MIN_BLUR,
  EDITOR_MIN_HEIGHT,
  EDITOR_MIN_WIDTH,
} from '../../config';
import * as yup from 'yup';

export const schemaImageProps = yup.object({
  width: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(EDITOR_MIN_WIDTH)
    .max(EDITOR_MAX_WIDTH),
  height: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(EDITOR_MIN_HEIGHT)
    .max(EDITOR_MAX_HEIGHT),
  isGrayscale: yup.boolean().required().oneOf([true, false]),
  blur: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(EDITOR_MIN_BLUR)
    .max(EDITOR_MAX_BLUR)
    .default(1),
});

export const schemaImageId = yup.object({
  imageId: yup
    .string()
    .required()
    .min(0)
    .max(Number.MAX_SAFE_INTEGER)
    .default('1'),
});

export const schemaPage = yup.object({
  page: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .default(1),
});

export const schemaEditorPageQueryParams = schemaPage.concat(
  schemaImageId.concat(schemaImageProps).concat(schemaImageProps)
);
