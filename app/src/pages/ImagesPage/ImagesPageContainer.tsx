import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import {
  EDITOR_DEFAULT_BLUR,
  EDITOR_DEFAULT_GRAYSCALE,
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
  LIST_THUMBNAIL_HEIGHT,
  LIST_THUMBNAIL_WIDTH,
} from '../../config';
import { ComponentStatus, ImageId, PaginationMove } from '../../types-ui';
import { logError } from '../../utils';
import { ImagesPage } from './ImagesPage';
import { useGetImages } from './useGetImages/useGetImages';
import {
  getImagesPageQueryParams,
  makeEditorUrl,
  makeImagesPageQueryParams,
} from './utils';

export const ImagesPageContainer = () => {
  const navigate = useNavigate();
  const [urlParams, setUrlsParams] = useSearchParams();

  const queryParams = getImagesPageQueryParams(urlParams);

  const imagesQuery = useGetImages({
    imageSize: {
      width: LIST_THUMBNAIL_WIDTH,
      height: LIST_THUMBNAIL_HEIGHT,
    },
    page: queryParams.page,
    onError: logError,
  });

  const handleNavigateToEditor = (imageId: ImageId) => {
    navigate(
      makeEditorUrl(
        imageId,
        queryParams.page,
        EDITOR_PREVIEW_INIT_WIDTH,
        EDITOR_PREVIEW_INIT_HEIGHT,
        EDITOR_DEFAULT_GRAYSCALE,
        EDITOR_DEFAULT_BLUR
      )
    );
  };

  const handlePageChange = (move: PaginationMove) => {
    const newPage =
      move === 'prev' ? queryParams.page - 1 : queryParams.page + 1;
    setUrlsParams(makeImagesPageQueryParams(newPage));
  };

  if (imagesQuery.isLoading) {
    return <ImagesPage status={ComponentStatus.Loading} />;
  }
  if (imagesQuery.isError) {
    return <ErrorMessage />;
  }
  console.log('xxx', JSON.stringify(imagesQuery.data));
  return (
    <ImagesPage
      status={ComponentStatus.Loaded}
      page={queryParams.page}
      data={imagesQuery.data}
      onNavigateToEidtor={handleNavigateToEditor}
      onChangePage={handlePageChange}
    />
  );
};
