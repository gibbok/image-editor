import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import {
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
  LIST_THUMBNAIL_HEIGHT,
  LIST_THUMBNAIL_WIDTH,
} from '../../config';
import { ImageId, PaginationMove } from '../../types-ui';
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
        EDITOR_PREVIEW_INIT_HEIGHT
      )
    );
  };

  const handlePageChange = (move: PaginationMove) => {
    const newPage =
      move === 'prev' ? queryParams.page - 1 : queryParams.page + 1;
    setUrlsParams(makeImagesPageQueryParams(newPage));
  };

  if (imagesQuery.isLoading) {
    return <ImagesPage status="loading" />;
  }
  if (imagesQuery.isError) {
    return <ErrorMessage />;
  }

  return (
    <ImagesPage
      status="loaded"
      page={queryParams.page}
      data={imagesQuery.data}
      onNavigateToEidtor={handleNavigateToEditor}
      onChangePage={handlePageChange}
    />
  );
};
