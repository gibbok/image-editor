import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Paginator } from '../Paginator/Paginator';
import { ImageId } from '../../../types-ui';
import { Grid, Paper, Typography } from '@mui/material';
import { PaginationMove, ResultImagesUI } from '../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

type ImagesPageLoading = Readonly<{
  status: 'loading';
}>;

type ImagesPageLoaded = Readonly<{
  status: 'loaded';
  data: ResultImagesUI;
  page: number;
  onNavigateToEidtor: (imageId: ImageId) => void;
  onChangePage: (move: PaginationMove) => void;
}>;

type ImagesPageProps = ImagesPageLoading | ImagesPageLoaded;

export const ImagesPage = (props: ImagesPageProps) => {
  const handleNavigateToEditor = (imageId: ImageId) => () => {
    if (props.status === 'loaded') {
      props.onNavigateToEidtor(imageId);
    }
  };

  return (
    <Grid display="flex" justifyContent="center">
      {props.status === 'loading' ? (
        <CircularProgress />
      ) : props.data.images.length === 0 ? (
        <Typography variant="body2">No data</Typography>
      ) : (
        <Grid item>
          <ImageList
            variant="quilted"
            sx={{ width: '100%', maxWidth: 1024, height: '100%' }}
            cols={3}
          >
            {props.data.images.map((item) => (
              <ImageListItem key={item.imageId}>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={handleNavigateToEditor(item.imageId)}
                >
                  <LazyLoadImage
                    alt={item.author}
                    src={item.urlTransform}
                    effect="opacity"
                  />
                </Box>
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
                page={props.page}
                variant={props.data.pagination}
                onChange={props.onChangePage}
              />
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
