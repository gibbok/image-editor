import React from 'react';
import { useGetImages } from './useGetImages/useGetImages';
import { useSearchParams } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ClickOn, Paginator } from './Paginator';

const THUMBNAIL_WIDTH_RESIZED = 250;
const THUMBNAIL_HEIGHT_RESIZED = 166;

export const ImagesPage = () => {
  const [page, setPage] = React.useState(1);
  let [searchParams, setSearchParams] = useSearchParams();

  const imagesQuery = useGetImages({
    imageSizes: {
      width: THUMBNAIL_WIDTH_RESIZED,
      height: THUMBNAIL_HEIGHT_RESIZED,
    },
    page,
    onError: console.error, // TODO render error message
  });

  // React.useEffect(() => {
  //   setSearchParams(`?${new URLSearchParams({ page: 'whatever' })}`);
  // });

  const handleChangePage = (value: ClickOn) => {
    setPage((prevState) => (value === 'prev' ? prevState - 1 : prevState + 1));
  };

  return (
    <Box>
      {!imagesQuery.data || imagesQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <ImageList sx={{ width: 800, height: 800 }} cols={3}>
            {imagesQuery.data.images.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.urlResized} alt={item.author} loading="lazy" />
                <ImageListItemBar title={item.author} position="below" />
              </ImageListItem>
            ))}
          </ImageList>
          <Paginator
            page={page}
            variant={imagesQuery.data.pagination}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Box>
  );
};
// TODO make responsive the image list
