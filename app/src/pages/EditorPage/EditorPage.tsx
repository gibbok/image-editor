import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getResizedUrl2 } from '../ImagesPage/useGetImages/tranform';
import { PropertiesPanel } from './PropertiesPanel';
import { ImagePropertiesForChange } from './types';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import { getEditorPageQueryParams } from './utils';

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const { imageId, width, height, isGrayscale, blur } =
    getEditorPageQueryParams(urlParams);

  const [imageProps, setImageProps] = React.useState<ImagePropertiesForChange>({
    width,
    height,
    isGrayscale,
    blur,
  });

  const imageDetailsQuery = useGetImageDetails({
    imageId,
    width: imageProps.width,
    height: imageProps.height,
    onError: console.error,
  });

  const handleGoBackToImagesList = () => {
    navigate(-1);
  };

  const handleApply = (data: ImagePropertiesForChange) => {
    setImageProps(data);
  };

  return (
    <Box display="flex">
      <Box>
        Editor page {imageId}
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
        width={width}
        height={height}
        isGrayscale={isGrayscale}
        blur={blur}
        onReset={() => console.log('on reset')}
        onApply={handleApply}
        onDownload={(x) => console.log('on download', x)}
      />
    </Box>
  );
};
