import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getResizedUrl2 } from '../ImagesPage/useGetImages/tranform';
import { PropertiesPanel } from './PropertiesPanel';
import { ImagePropertiesForChange } from './types';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import {
  getEditorPageQueryParams,
  isEditorPageQueryParamsSameAsPageState,
  makeEditorPageQueryParam,
} from './utils';

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const qp = getEditorPageQueryParams(urlParams);

  const [imageProps, setImageProps] = React.useState<ImagePropertiesForChange>({
    width: qp.width,
    height: qp.height,
    isGrayscale: qp.isGrayscale,
    blur: qp.blur,
  });

  const imageDetailsQuery = useGetImageDetails({
    imageId: qp.imageId,
    width: imageProps.width,
    height: imageProps.height,
    onError: console.error,
  });

  React.useEffect(() => {
    if (isEditorPageQueryParamsSameAsPageState(qp, imageProps)) {
      return;
    }
    setImageProps({
      width: qp.width,
      height: qp.height,
      isGrayscale: qp.isGrayscale,
      blur: qp.blur,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qp.width, qp.height, qp.isGrayscale, qp.blur]);

  React.useEffect(() => {
    if (isEditorPageQueryParamsSameAsPageState(qp, imageProps)) {
      return;
    }
    setUrlsParams(
      makeEditorPageQueryParam({
        ...imageProps,
        imageId: qp.imageId,
        page: qp.page,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    imageProps.width,
    imageProps.height,
    imageProps.isGrayscale,
    imageProps.blur,
  ]);

  const handleGoBackToImagesList = () => {
    navigate(`/?page=${qp.page}`);
  };

  const handleApply = (data: ImagePropertiesForChange) => {
    setImageProps(data);
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
            src={getResizedUrl2({
              originalUrl: imageDetailsQuery.data.urlTransform,
              desiredResize: {
                width: imageProps.width,
                height: imageProps.height,
              },
              isGrayscale: imageProps.isGrayscale,
              blur: imageProps.blur,
            })}
            alt={imageDetailsQuery.data.author}
            loading="lazy"
          />
        )}
      </Box>
      <PropertiesPanel
        width={imageProps.width}
        height={imageProps.height}
        isGrayscale={imageProps.isGrayscale}
        blur={imageProps.blur}
        onReset={() => console.log('on reset')}
        onApply={handleApply}
        onDownload={(x) => console.log('on download', x)}
      />
    </Box>
  );
};
