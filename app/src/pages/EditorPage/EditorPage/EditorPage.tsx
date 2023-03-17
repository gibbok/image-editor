import { Box, Button, Paper, Skeleton } from '@mui/material';
import {
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
} from '../../../config';
import { makeUrlWithSizeGrayscaleBlur } from '../../../utils';
import { PropertiesPanel } from '../PropertiesPanel/PropertiesPanel';
import { ImageChanges } from '../types';
import { ImageInfoUI } from '../../../types-ui';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PANEL_LEFT = 200;

type EditorPageLoading = Readonly<{
  status: 'loading';
}>;

type EditorPageLoaded = Readonly<{
  status: 'loaded';
  data: ImageInfoUI &
    Readonly<{
      isGrayscale: boolean;
      blur: number;
    }>;
  onDownload: () => void;
  onApply: (dataImage: ImageChanges) => void;
  onGoBackToImagesList: () => void;
}>;

export type EditorPageProps = EditorPageLoading | EditorPageLoaded;

export const EditorPage = (props: EditorPageProps) => {
  if (props.status === 'loading') {
    return (
      <Skeleton
        variant="rectangular"
        width={EDITOR_PREVIEW_INIT_WIDTH}
        height={EDITOR_PREVIEW_INIT_HEIGHT}
      />
    );
  }

  return (
    <Box mt={2} display="flex">
      <Box
        style={{
          position: 'fixed',
          width: PANEL_LEFT,
          height: '100%',
          zIndex: 1,
        }}
      >
        <PropertiesPanel
          imageId={props.data.imageId}
          width={props.data.width}
          height={props.data.height}
          isGrayscale={props.data.isGrayscale}
          blur={props.data.blur}
          onApply={props.onApply}
          onDownload={props.onDownload}
        />
      </Box>
      <Box>
        <Box style={{ position: 'absolute', left: PANEL_LEFT + 40 }}>
          <LazyLoadImage
            src={makeUrlWithSizeGrayscaleBlur({
              desiredSize: {
                width: props.data.width,
                height: props.data.height,
              },
              isGrayscale: props.data.isGrayscale,
              blur: props.data.blur,
            })(props.data.imageId)}
            effect="opacity"
          />
        </Box>
      </Box>
      <Box>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          <Box p={2} display="flex" justifyContent="center">
            <Button variant="contained" onClick={props.onGoBackToImagesList}>
              Go to Image List
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
