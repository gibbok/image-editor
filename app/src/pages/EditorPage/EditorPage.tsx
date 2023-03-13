import { Box, Button, Grid, Paper, Skeleton } from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  EDITOR_FILE_NAME_PREFIX,
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
} from '../../config';
import { makeUrlWithSizeGrayscaleBlur } from '../../utils-urls';
import { PropertiesPanel } from './PropertiesPanel';
import { ImageState } from './types';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import * as O from 'fp-ts/Option';
import {
  downloadImage,
  getEditorPageQueryParams,
  isEditorPageQueryParamsSameAsImageState,
  makeEditorPageQueryParams,
  makeFileName,
  makeUrlToImagesList,
} from './utils';

export const EditorPage = () => {
  const navigate = useNavigate();
  const [urlParams, setUrlsParams] = useSearchParams();

  const qp = getEditorPageQueryParams(urlParams);

  const [imageState, setImageState] = React.useState<ImageState>({
    width: qp.width,
    height: qp.height,
    isGrayscale: qp.isGrayscale,
    blur: qp.blur,
  });

  const imageDetailsQuery = useGetImageDetails({
    imageId: qp.imageId,
    previewWidth: imageState.width,
    previewHeight: imageState.height,
    onError: console.error,
  });

  React.useEffect(() => {
    if (isEditorPageQueryParamsSameAsImageState(qp, imageState)) {
      return;
    }
    setImageState({
      width: qp.width,
      height: qp.height,
      isGrayscale: qp.isGrayscale,
      blur: qp.blur,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qp.width, qp.height, qp.isGrayscale, qp.blur]);

  React.useEffect(() => {
    if (isEditorPageQueryParamsSameAsImageState(qp, imageState)) {
      return;
    }
    setUrlsParams(
      makeEditorPageQueryParams({
        ...imageState,
        imageId: qp.imageId,
        page: qp.page,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    imageState.width,
    imageState.height,
    imageState.isGrayscale,
    imageState.blur,
  ]);

  const handleGoBackToImagesList = () => {
    navigate(makeUrlToImagesList(qp.page));
  };

  const handleApply = (dataImage: ImageState) => {
    setImageState(dataImage);
  };

  const makeImageUrl = makeUrlWithSizeGrayscaleBlur({
    desiredSize: {
      width: imageState.width,
      height: imageState.height,
    },
    isGrayscale: imageState.isGrayscale,
    blur: imageState.blur,
  });

  const handleDownload = () => {
    pipe(
      imageDetailsQuery.data,
      O.fromNullable,
      O.map((data) =>
        pipe(
          makeFileName(EDITOR_FILE_NAME_PREFIX)({
            ...imageState,
            imageId: qp.imageId,
          }),
          downloadImage(makeImageUrl(data.urlTransform))
        )
      )
    );
  };
  const isLoading = !imageDetailsQuery.data || imageDetailsQuery.isLoading;
  return (
    <Grid container mt={2} display="flex" justifyContent="center">
      <Grid item>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={EDITOR_PREVIEW_INIT_WIDTH}
            height={EDITOR_PREVIEW_INIT_HEIGHT}
          />
        ) : (
          <img
            src={makeImageUrl(imageDetailsQuery.data.urlTransform)}
            alt={imageDetailsQuery.data.author}
            loading="lazy"
          />
        )}
      </Grid>
      <Grid item>
        <Box ml={4} mt={1} style={{ width: 200 }}>
          <PropertiesPanel
            imageId={qp.imageId}
            width={imageState.width}
            height={imageState.height}
            isGrayscale={imageState.isGrayscale}
            blur={imageState.blur}
            onApply={handleApply}
            onDownload={handleDownload}
          />
        </Box>
      </Grid>
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
          <Button variant="contained" onClick={handleGoBackToImagesList}>
            Go to Image List
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};
