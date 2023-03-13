import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
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
import { ImageChanges } from './types';
import { ImageId } from '../../types-ui';

type PropertiesPanelProps = ImageChanges &
  Readonly<{
    imageId: ImageId;
    onApply: (propsChange: ImageChanges) => void;
    onDownload: () => void;
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
  imageId,
  width,
  height,
  isGrayscale,
  blur,
  onApply,
  onDownload,
}: PropertiesPanelProps) => {
  const {
    control,
    handleSubmit,
    reset,
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

  const onSubmit = (data: FormData) => {
    onApply(data);
  };

  const isDisabledApplyButton = Object.keys(errors).length > 0;

  React.useEffect(() => {
    reset({
      width,
      height,
      isGrayscale,
      blur,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, isGrayscale, blur]);

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <Typography variant="body2">Image Id: {imageId}</Typography>
          </Grid>
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
                  control={
                    <Checkbox
                      defaultChecked={isGrayscale}
                      {...field}
                      checked={field.value}
                    />
                  }
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
              fullWidth
              type="submit"
              variant="contained"
              disabled={isDisabledApplyButton}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Button
          fullWidth
          onClick={onDownload}
          type="submit"
          variant="contained"
        >
          Download
        </Button>
      </Box>
    </Box>
  );
};
