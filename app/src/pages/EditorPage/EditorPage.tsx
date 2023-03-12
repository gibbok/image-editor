import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { makeUrlWithSizesGrayscaleBlur } from '../../utils';
import { PropertiesPanel } from './PropertiesPanel';
import { ImageState } from './types';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import {
  getEditorPageQueryParams,
  isEditorPageQueryParamsSameAsPageState as isEditorPageQueryParamsSameAsImageState,
  makeEditorPageQueryParam,
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
      makeEditorPageQueryParam({
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

  return (
    <Box display="flex">
      <Box>
        Editor page {qp.imageId}
        <Button variant="outlined" onClick={handleGoBackToImagesList}>
          Go to list
        </Button>
        {!imageDetailsQuery.data || imageDetailsQuery.isLoading ? (
          'loading' // TODO add spinner
        ) : (
          <img
            src={makeUrlWithSizesGrayscaleBlur({
              originalUrl: imageDetailsQuery.data.urlTransform,
              desiredSizes: {
                width: imageState.width,
                height: imageState.height,
              },
              isGrayscale: imageState.isGrayscale,
              blur: imageState.blur,
            })}
            alt={imageDetailsQuery.data.author}
            loading="lazy"
          />
        )}
      </Box>
      <PropertiesPanel
        width={imageState.width}
        height={imageState.height}
        isGrayscale={imageState.isGrayscale}
        blur={imageState.blur}
        onReset={() => console.log('on reset')}
        onApply={handleApply}
        onDownload={(x) => console.log('on download', x)}
      />
    </Box>
  );
};
