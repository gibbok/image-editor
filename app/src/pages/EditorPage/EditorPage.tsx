import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PropertiesPanel } from './PropertiesPanel';
import { ImagePropertiesForChange } from './types';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import { getEditorPageQueryParams } from './utils';

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const { imageId, width, height, isGrayscale, blur } =
    getEditorPageQueryParams(urlParams);

  // const [imageProps, setImageProps] = React.useState<ImagePropertiesForChange>({
  //   width,
  //   height,
  //   isGrayscale,
  //   blur,
  // });

  const imageDetailsQuery = useGetImageDetails({
    imageId,
    width,
    height,
    isGrayscale,
    blur,
    onError: console.error,
  });

  const handleGoBackToImagesList = () => {
    navigate(-1);
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
            src={imageDetailsQuery.data.urlTransform} // TODOD check url is too big here
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
        onApply={(x) => console.log('on apply', JSON.stringify(x))}
        onDownload={(x) => console.log('on download', x)}
      />
    </Box>
  );
};
