import { useQuery, UseQueryResult } from '@tanstack/react-query';

import axios from 'axios';
import { Images, ResponseImages } from '../../../types-api';
import { ImagesUI, ResultImagesUI } from '../../../types-ui';
import { tranformResponseForUI } from './tranform';
import { ImageSizes } from './type';

const KEY_IMAGES = 'GET_IMAGES';

// TODO handle page and limit https://picsum.photos/v2/list?page=2&limit=100
export const fetchImages = ({
  page,
}: Readonly<{ page: number }>): Promise<ResponseImages> =>
  axios.get(`list?page=${page}`).then((response) => ({
    images: response.data,
    linkHeader: response.headers.link,
  }));

// TODO add error handling cb
export type UseGetImages = (
  params: Readonly<{
    imageSizes: ImageSizes;
    page: number;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ResultImagesUI, unknown>;
export const useGetImages: UseGetImages = ({ imageSizes, page, onError }) =>
  useQuery([KEY_IMAGES, { page }], () => fetchImages({ page }), {
    select: (x) => {
      return {
        images: tranformResponseForUI(x.images, imageSizes),
        pagination: 'next', // SPO
      };
    },
    onError,
  });

//UseQueryResult<ImagesUI, unknown>;
