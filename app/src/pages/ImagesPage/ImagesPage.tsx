import React from 'react';
import { useGetImages } from './useGetImages/useGetImages';
import { useSearchParams } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const THUMBNAIL_WIDTH_RESIZED = 250;
const THUMBNAIL_HEIGHT_RESIZED = 166;

export const ImagesPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const imagesQuery = useGetImages({
    imageSizes: {
      width: THUMBNAIL_WIDTH_RESIZED,
      height: THUMBNAIL_HEIGHT_RESIZED,
    },
    page: 0,
    onError: console.error, // TODO render error message
  });

  // React.useEffect(() => {
  //   setSearchParams(`?${new URLSearchParams({ page: 'whatever' })}`);
  // });

  return (
    <Box>
      {!imagesQuery.data || imagesQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <ImageList sx={{ width: 800, height: 800 }}>
          {imagesQuery.data.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.urlResized}?w=248&fit=crop&auto=format`}
                srcSet={`${item.urlResized}?w=248&fit=crop&auto=format&dpr=2 2x`} // TODO look into srcSet
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
// TODO make responsive the image list
