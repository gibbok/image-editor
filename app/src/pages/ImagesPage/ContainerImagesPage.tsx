import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
  LIST_THUMBNAIL_HEIGHT,
  LIST_THUMBNAIL_WIDTH,
} from '../../config';
import { ImageId, PaginationMove } from '../../types-ui';
import { ImagesPage } from './ImagesPage';
import { useGetImages } from './useGetImages/useGetImages';
import {
  getImagesPageQueryParams,
  makeEditorUrl,
  makeImagesPageQueryParams,
} from './utils';

export const ContainerImagesPage = () => {
  const navigate = useNavigate();
  const [urlParams, setUrlsParams] = useSearchParams();
  const pageQueryParam = getImagesPageQueryParams(urlParams).page;

  const imagesQuery = useGetImages({
    imageSize: {
      width: LIST_THUMBNAIL_WIDTH,
      height: LIST_THUMBNAIL_HEIGHT,
    },
    page: pageQueryParam,
    onError: console.error, // TODO render error message
  });

  if (imagesQuery.isLoading) {
    return <ImagesPage status="loading" />;
  }
  if (imagesQuery.isError) {
    return (
      <Box>
        <Typography variant="h1">Sorry.. there was an error</Typography>
      </Box>
    );
  }

  const handleNavigateToEditor = (imageId: ImageId) => {
    navigate(
      makeEditorUrl(
        imageId,
        pageQueryParam,
        EDITOR_PREVIEW_INIT_WIDTH,
        EDITOR_PREVIEW_INIT_HEIGHT
      )
    );
  };

  const handlePageChange = (move: PaginationMove) => {
    const newPage = move === 'prev' ? pageQueryParam - 1 : pageQueryParam + 1;
    setUrlsParams(makeImagesPageQueryParams(newPage));
  };

  return (
    <ImagesPage
      status="loaded"
      page={pageQueryParam}
      data={imagesQuery.data}
      onNavigateToEidtor={handleNavigateToEditor}
      onChangePage={handlePageChange}
    />
  );
};
