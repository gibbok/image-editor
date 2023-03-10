import { Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const EditorPage = () => {
  const navigate = useNavigate();
  let [urlParams, setUrlsParams] = useSearchParams();

  const imageId = urlParams.get('id');

  const handleGoBackToList = () => {
    navigate(-1);
  };
  return (
    <div>
      Editor page {imageId}
      <Button variant="outlined" onClick={handleGoBackToList}>
        Go to list
      </Button>
    </div>
  );
};
