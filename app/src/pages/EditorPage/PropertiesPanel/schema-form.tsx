import {
  EDITOR_MAX_BLUR,
  EDITOR_MAX_HEIGHT,
  EDITOR_MAX_WIDTH,
  EDITOR_MIN_BLUR,
  EDITOR_MIN_HEIGHT,
  EDITOR_MIN_WIDTH,
} from '../../../config';
import * as yup from 'yup';

export const schema = yup.object({
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
