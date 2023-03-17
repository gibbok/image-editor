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
    .max(EDITOR_MAX_BLUR),
});

export const schemaIdentificator = yup.object({
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

export const schemaEditorPageQuerystring = schemaIdentificator.concat(
  schemaImageProps.concat(schemaImageProps)
);
