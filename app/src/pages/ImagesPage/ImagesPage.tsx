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
    <Box>
      {!imagesQuery.data || imagesQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <ImageList
            sx={{ width: 500, height: 450 }}
            cols={3}
            rowHeight={LIST_THUMBNAIL_HEIGHT}
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
// TODO handle case with data returned but empty, no data
// TODO add snackbar
