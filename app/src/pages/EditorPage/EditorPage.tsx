import { Box, Button, Grid, Paper, Skeleton } from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  EDITOR_FILE_NAME_PREFIX,
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
} from '../../config';
import { makeUrlWithSizeGrayscaleBlur } from '../../utils';
import { PropertiesPanel } from './PropertiesPanel';
import { ImageChanges } from './types';
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

  const queryParams = getEditorPageQueryParams(urlParams);

  const [imageState, setImageState] = React.useState<ImageChanges>({
    width: queryParams.width,
    height: queryParams.height,
    isGrayscale: queryParams.isGrayscale,
    blur: queryParams.blur,
  });

  const imageDetailsQuery = useGetImageDetails({
    imageId: queryParams.imageId,
    previewWidth: imageState.width,
    previewHeight: imageState.height,
    onError: console.error, // TODOD add snackbar
  });

  React.useEffect(() => {
    if (isEditorPageQueryParamsSameAsImageState(queryParams, imageState)) {
      return;
    }
    setImageState({
      width: queryParams.width,
      height: queryParams.height,
      isGrayscale: queryParams.isGrayscale,
      blur: queryParams.blur,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    queryParams.width,
    queryParams.height,
    queryParams.isGrayscale,
    queryParams.blur,
  ]);

  React.useEffect(() => {
    if (isEditorPageQueryParamsSameAsImageState(queryParams, imageState)) {
      return;
    }
    setUrlsParams(
      makeEditorPageQueryParams({
        ...imageState,
        imageId: queryParams.imageId,
        page: queryParams.page,
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
    navigate(makeUrlToImagesList(queryParams.page));
  };

  const handleApply = (dataImage: ImageChanges) => {
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
            imageId: queryParams.imageId,
          }),
          downloadImage(makeImageUrl(data.imageId))
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
            src={makeImageUrl(imageDetailsQuery.data.imageId)}
            alt={imageDetailsQuery.data.author}
            loading="lazy"
          />
        )}
      </Grid>
      <Grid item>
        <Box ml={4} mt={1} style={{ width: 200 }}>
          <PropertiesPanel
            imageId={queryParams.imageId}
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
