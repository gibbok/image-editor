import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    setImageProps((prevState) => ({ ...prevState, data }));
  };

  return (
    <Box mt={6}>
      <FormControl>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                label="Width"
                {...field}
                defaultValue={width}
              />
            )}
          />
          <p>{errors.width?.message}</p>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                label="Height"
                {...field}
                defaultValue={height}
              />
            )}
          />
          <p>{errors.height?.message}</p>
          <Controller
            name="isGrayscale"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={isGrayscale} {...field} />}
                label="Grayscale"
              />
            )}
          />
          <p>{errors.isGrayscale?.message}</p>
          <Controller
            name="blur"
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                label="Blur"
                defaultValue={blur}
                {...field}
              />
            )}
          />
          <p>{errors.blur?.message}</p>
          <Button type="submit" variant="outlined">
            Apply
          </Button>
          {/* <input type="submit" /> */}
        </Box>
      </FormControl>
    </Box>
  );
};
