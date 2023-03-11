import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EDITOR_PREVIEW_INIT_WIDTH } from '../../config';
import { PropertiesPanel } from './PropertiesPanel';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import { getImageIdFromImageIdQueryParam } from './utils';

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const imageIdParam = getImageIdFromImageIdQueryParam(urlParams.get('id')); // TODO get default in case of wrong values
  const widthParam = urlParams.get('width') ?? EDITOR_PREVIEW_INIT_WIDTH;
  const heightParam = urlParams.get('height') ?? EDITOR_PREVIEW_INIT_WIDTH;
  const grayParam = Boolean(urlParams.get('gray'));
  const blurParam = urlParams.get('blur') ?? 1;

  const imageDetailsQuery = useGetImageDetails({
    imageId: imageIdParam,
    width: Number(widthParam),
    height: Number(heightParam),
    isGrayscale: grayParam,
    blur: Number(blurParam),
    onError: console.error,
  });

  const imageId = urlParams.get('id'); // TODO show id not found from server

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
            src={imageDetailsQuery.data.urlResized} // TODOD check url is too big here
            alt={imageDetailsQuery.data.author}
            loading="lazy"
          />
        )}
      </Box>
      <PropertiesPanel />
    </Box>
  );
};
