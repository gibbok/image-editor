import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
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
    isGrayscale: yup.boolean().required().oneOf([true, false]),
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      width,
      height,
      isGrayscale,
      blur,
    },
  });

  console.log('xxx isGrayscale', isGrayscale);
  console.log('xxx blur', blur);
  const onSubmit = (data: FormData) => {
    onApply(data);
  };

  const isDisabledApplyButton = Object.keys(errors).length > 0;

  return (
    <Box mt={6}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <Controller
              name="width"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    error={'width' in errors}
                    type="number"
                    label="Width"
                    helperText={errors.width?.message}
                    {...field}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <TextField
                  error={'height' in errors}
                  type="number"
                  label="Height"
                  helperText={errors.height?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="isGrayscale"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox defaultChecked={isGrayscale} {...field} />}
                  label="Grayscale"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="blur"
              control={control}
              render={({ field }) => (
                <TextField
                  error={'blur' in errors}
                  type="number"
                  label="Blur"
                  helperText={errors.blur?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
              disabled={isDisabledApplyButton}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
