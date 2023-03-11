import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React from 'react';
import {
  EDITOR_MAX_BLUR,
  EDITOR_MAX_WIDTH,
  EDITOR_MIN_BLUR,
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
      <FormControl>
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
      </FormControl>
    </Box>
  );
};
