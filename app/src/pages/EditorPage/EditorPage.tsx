import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PropertiesPanel } from './PropertiesPanel';
import { useGetImageDetails } from './useGetImageInfo/useGetImageInfo';

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const imageDetailsQuery = useGetImageDetails({
    imageId: '1',
    onError: console.error,
  });

  console.log('xxx', imageDetailsQuery.data);

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
      </Box>
      <PropertiesPanel />
    </Box>
  );
};

/*
TODO
- get the type
- retrive and render the image
- adjust image

*/
