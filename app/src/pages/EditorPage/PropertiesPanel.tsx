import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import {
  EDITOR_MAX_BLUR,
  EDITOR_MAX_HEIGHT,
  EDITOR_MAX_WIDTH,
  EDITOR_MIN_BLUR,
  EDITOR_MIN_HEIGHT,
  EDITOR_MIN_WIDTH,
} from '../../config';
import { ImagePropertiesForChange } from './types';

type PropertiesPanelProps = ImagePropertiesForChange &
  Readonly<{
    onReset: () => void;
    onApply: (propsChange: ImagePropertiesForChange) => void;
    onDownload: (propsChange: ImagePropertiesForChange) => void;
  }>;

type EventTextField = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

const clamp = (number: number, min: number, max: number) =>
  Math.max(min, Math.min(number, max));

const schema = yup
  .object({
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
    isGrayscale: yup.boolean(),
    blur: yup
      .number()
      .positive()
      .integer()
      .required()
      .min(EDITOR_MIN_BLUR)
      .max(EDITOR_MAX_BLUR),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const PropertiesPanel = ({
  width,
  height,
  isGrayscale,
  blur,
  onReset,
  onApply,
  onDownload,
}: PropertiesPanelProps) => {
  const [imageProps, setImageProps] = React.useState<ImagePropertiesForChange>({
    width,
    height,
    isGrayscale,
    blur,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setImageProps((prevState) => ({ ...prevState, data }));
  };

  const handleChangeWidth = (e: EventTextField) => {
    setImageProps((prevState) => ({
      ...prevState,
      width: clamp(
        parseInt(e.target.value, 10),
        EDITOR_MIN_WIDTH,
        EDITOR_MAX_WIDTH
      ),
    }));
  };

  console.log('xxx', imageProps);

  return (
    <Box mt={6}>
      {/* <FormControl>
        <TextField
          fullWidth
          required
          label="Width"
          type="number"
          defaultValue={width}
          value={imageProps.width}
          InputProps={{
            inputProps: {
              min: EDITOR_MIN_WIDTH,
              max: EDITOR_MAX_WIDTH,
            },
          }}
          onChange={handleChangeWidth}
        />
        <TextField
          fullWidth
          required
          id="height"
          label="Height"
          type="number"
          value={imageProps.height}
          InputProps={{
            inputProps: {
              min: EDITOR_MIN_WIDTH,
              max: EDITOR_MAX_WIDTH,
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={imageProps.isGrayscale} />}
          label="Grayscale"
        />
        <TextField
          fullWidth
          required
          id="blur"
          label="Blur"
          type="number"
          value={imageProps.blur}
          InputProps={{
            inputProps: {
              min: EDITOR_MIN_BLUR,
              max: EDITOR_MAX_BLUR,
            },
          }}
        />
      </FormControl> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        width
        <input {...register('width')} defaultValue={width} />
        <p>{errors.width?.message}</p>
        height
        <input {...register('height')} defaultValue={height} />
        <p>{errors.height?.message}</p>
        isGrayscale
        <input
          {...register('isGrayscale')}
          defaultValue={isGrayscale.toString()}
        />
        <p>{errors.isGrayscale?.message}</p>
        blur
        <input {...register('blur')} defaultValue={blur} />
        <p>{errors.blur?.message}</p>
        <input type="submit" />
      </form>
    </Box>
  );
};
