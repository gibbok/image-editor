import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PropertiesPanel } from './PropertiesPanel';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';
import {
  getImageIdFromImageIdQueryParam,
  makeEditorPageQueryParam,
} from './utils';

const PREVIEW_INIT_WIDTH_RESIZED = 800;
const PREVIEW_INIT_HEIGHT_RESIZED = 600;

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const imageIdParam = getImageIdFromImageIdQueryParam(urlParams.get('id'));

  const imageDetailsQuery = useGetImageDetails({
    imageId: imageIdParam,
    imageSizes: {
      width: PREVIEW_INIT_WIDTH_RESIZED,
      height: PREVIEW_INIT_HEIGHT_RESIZED,
    },
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
