import React from 'react';
import { useGetImages } from './useGetImages/useGetImages';
import { useSearchParams } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Paginator } from './Paginator';
import { PaginationMove } from '../../types-ui';
import { useNavigate } from 'react-router-dom';
import { getPageFromPageParams } from './utils';

const THUMBNAIL_WIDTH_RESIZED = 250;
const THUMBNAIL_HEIGHT_RESIZED = 166;

const makeUrlParams = (page: number) =>
  `?${new URLSearchParams({ page: page.toString() })}`;

export const ImagesPage = () => {
  let [urlParams, setUrlsParams] = useSearchParams();
  const pageParam = getPageFromPageParams(urlParams.get('page'));
  console.log('xxx myPage', pageParam);
  const [page, setPage] = React.useState(pageParam);

  const navigate = useNavigate();

  console.log('xxx page', page);
  const imagesQuery = useGetImages({
    imageSizes: {
      width: THUMBNAIL_WIDTH_RESIZED,
      height: THUMBNAIL_HEIGHT_RESIZED,
    },
    page,
    onError: console.error, // TODO render error message
  });

  React.useEffect(() => {
    setUrlsParams(makeUrlParams(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    setPage(pageParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  const handleChangePage = (move: PaginationMove) => {
    setPage((prevState) => (move === 'prev' ? prevState - 1 : prevState + 1));
  };

  const handleNavigateToEditor = (imageId: string) => () => {
    navigate(`/editor?id=${imageId}`);
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
                <img
                  style={{ cursor: 'pointer' }}
                  src={item.urlResized}
                  alt={item.author}
                  loading="lazy"
                  onClick={handleNavigateToEditor(item.id)}
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
