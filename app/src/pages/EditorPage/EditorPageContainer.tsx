import { pipe } from 'fp-ts/lib/function';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { logError, makeUrlWithSizeGrayscaleBlur } from '../../utils';
import { EditorPage } from './EditorPage';
import { ImageChanges } from './types';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import {
  downloadImage,
  getEditorPageQueryParams,
  makeEditorPageQueryParams,
  makeFileName,
  makeUrlToImagesList,
} from './utils';
import * as O from 'fp-ts/Option';
import { EDITOR_FILE_NAME_PREFIX } from '../../config';

export const EditorPageContainer = () => {
  const navigate = useNavigate();
  const [urlParams, setUrlsParams] = useSearchParams();

  const queryParams = getEditorPageQueryParams(urlParams);

  const imageDetailsQuery = useGetImageDetails({
    imageId: queryParams.imageId,
    previewWidth: queryParams.width,
    previewHeight: queryParams.height,
    onError: logError,
  });

  if (imageDetailsQuery.isLoading) {
    return <EditorPage status="loading" />;
  }
  if (imageDetailsQuery.isError) {
    return <ErrorMessage />;
  }
  const handleDownload = () => {
    pipe(
      imageDetailsQuery.data,
      O.fromNullable,
      O.map((data) =>
        pipe(
          makeFileName(EDITOR_FILE_NAME_PREFIX)({
            ...data,
            imageId: data.imageId,
            isGrayscale: queryParams.isGrayscale,
            blur: queryParams.blur,
          }),
          downloadImage(
            makeUrlWithSizeGrayscaleBlur({
              desiredSize: {
                width: imageDetailsQuery.data.width,
                height: imageDetailsQuery.data.height,
              },
              isGrayscale: queryParams.isGrayscale,
              blur: queryParams.blur,
            })(data.imageId)
          )
        )
      )
    );
  };

  const handleApply = (dataImage: ImageChanges) => {
    setUrlsParams(
      makeEditorPageQueryParams({
        ...dataImage,
        imageId: queryParams.imageId,
        page: queryParams.page,
      })
    );
  };

  const handleGoBackToImagesList = () => {
    navigate(makeUrlToImagesList(queryParams.page));
  };

  return (
    <EditorPage
      status="loaded"
      data={{
        ...imageDetailsQuery.data,
        imageId: queryParams.imageId,
        isGrayscale: queryParams.isGrayscale,
        blur: queryParams.blur,
        width: queryParams.width,
        height: queryParams.height,
      }}
      onDownload={handleDownload}
      onApply={handleApply}
      onGoBackToImagesList={handleGoBackToImagesList}
    />
  );
};
