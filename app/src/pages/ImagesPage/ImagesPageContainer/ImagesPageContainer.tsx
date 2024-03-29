import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import {
  EDITOR_DEFAULT_BLUR,
  EDITOR_DEFAULT_GRAYSCALE,
  EDITOR_PREVIEW_INIT_HEIGHT,
  EDITOR_PREVIEW_INIT_WIDTH,
  LIST_THUMBNAIL_HEIGHT,
  LIST_THUMBNAIL_WIDTH,
} from '../../../config';
import { ImageId } from '../../../types-ui';
import { logError } from '../../../utils';
import { ImagesPage } from '../ImagesPage/ImagesPage';
import { PaginationMove } from '../types';
import { useGetImages } from '../useGetImages/useGetImages';
import {
  getImagesPageQueryParams,
  makeEditorUrl,
  makeImagesPageQueryParams,
} from '../utils/utils';

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
      makeEditorUrl({
        imageId,
        page: queryParams.page,
        width: EDITOR_PREVIEW_INIT_WIDTH,
        height: EDITOR_PREVIEW_INIT_HEIGHT,
        isGrayscale: EDITOR_DEFAULT_GRAYSCALE,
        blur: EDITOR_DEFAULT_BLUR,
      })
    );
  };

  const handlePageChange = (move: PaginationMove) => {
    const newPage =
      move === 'prev' ? queryParams.page - 1 : queryParams.page + 1;
    setUrlsParams(makeImagesPageQueryParams(newPage));
  };

  if (imagesQuery.isLoading) {
    return <ImagesPage status={'loading'} />;
  }
  if (imagesQuery.isError) {
    return <ErrorMessage />;
  }

  return (
    <ImagesPage
      status={'loaded'}
      page={queryParams.page}
      data={imagesQuery.data}
      onNavigateToEidtor={handleNavigateToEditor}
      onChangePage={handlePageChange}
    />
  );
};
