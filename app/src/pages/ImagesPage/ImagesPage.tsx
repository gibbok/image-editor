import React from 'react';
import { useGetImages } from './useGetImages/useGetImages';
import { useSearchParams } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Paginator } from './Paginator/Paginator';
import { ImageId, PaginationMove } from '../../types-ui';
import { useNavigate } from 'react-router-dom';
import {
  getImagesPageQueryParams,
  makeEditorUrl,
  makeImagesPageQueryParams,
} from './utils';
import { LIST_THUMBNAIL_HEIGHT, LIST_THUMBNAIL_WIDTH } from '../../config';
import { Paper } from '@mui/material';

export const ImagesPage = () => {
  const navigate = useNavigate();
  const [urlParams, setUrlsParams] = useSearchParams();
  const pageParam = getImagesPageQueryParams(urlParams).page;
  const [page, setPage] = React.useState(pageParam);

  const imagesQuery = useGetImages({
    imageSizes: {
      width: LIST_THUMBNAIL_WIDTH,
      height: LIST_THUMBNAIL_HEIGHT,
    },
    page,
    onError: console.error, // TODO render error message
  });

  React.useEffect(() => {
    setPage(pageParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  React.useEffect(() => {
    if (page !== pageParam) {
      setUrlsParams(makeImagesPageQueryParams(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangePage = (move: PaginationMove) => {
    setPage((prevState) => (move === 'prev' ? prevState - 1 : prevState + 1));
  };

  const handleNavigateToEditor = (imageId: ImageId) => () => {
    navigate(makeEditorUrl(imageId, page));
  };

  return (
    <Box display="flex" justifyContent="center">
      {!imagesQuery.data || imagesQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <ImageList
            sx={{ width: '100%', maxWidth: 1024, height: '100%' }}
            cols={3}
          >
            {imagesQuery.data.images.map((item) => (
              <ImageListItem key={item.imageId}>
                <img
                  style={{ cursor: 'pointer' }}
                  src={item.urlTransform}
                  alt={item.author}
                  loading="lazy"
                  onClick={handleNavigateToEditor(item.imageId)}
                />
                <ImageListItemBar title={item.author} position="below" />
              </ImageListItem>
            ))}
          </ImageList>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
            }}
            elevation={3}
          >
            <Box p={2} display="flex" justifyContent="center">
              <Paginator
                page={page}
                variant={imagesQuery.data.pagination}
                onChange={handleChangePage}
              />
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};
// TODO handle case with data returned but empty, no data
// TODO add snackbar
// TODO publish on github static
