import React from 'react';
import { useGetImages } from './useGetImages/useGetImages';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Images = () => {
  const imagesQuery = useGetImages();

  // TODO render error message
  return (
    <Box>
      {!imagesQuery.data || imagesQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <ImageList sx={{ width: 800, height: 800 }}>
          {imagesQuery.data.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.download_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.download_url}?w=248&fit=crop&auto=format&dpr=2 2x`} // TODO look into srcSet
                alt={item.author}
                loading="lazy"
              />
              <ImageListItemBar title={item.author} position="below" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};
