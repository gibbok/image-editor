import { useQuery, UseQueryResult } from '@tanstack/react-query';

import axios from 'axios';
import { ResponseImages } from '../../../types-api';
import { ResultImagesUI } from '../../../types-ui';
import {
  getPaginationStateFromHeader,
  tranformResponseForUI,
} from './tranform';
import { ImageSizes } from './type';

const KEY_IMAGES = 'GET_IMAGES';

export const fetchImages = ({
  page,
}: Readonly<{ page: number }>): Promise<ResponseImages> =>
  axios.get(`list?page=${page}`).then((response) => ({
    images: response.data,
    linkHeader: response.headers.link,
  }));

export type UseGetImages = (
  params: Readonly<{
    imageSizes: ImageSizes;
    page: number;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ResultImagesUI, unknown>;
export const useGetImages: UseGetImages = ({ imageSizes, page, onError }) =>
  useQuery([KEY_IMAGES, { page }], () => fetchImages({ page }), {
    select: (data) => ({
      images: tranformResponseForUI(data.images, imageSizes),
      pagination: getPaginationStateFromHeader(data.linkHeader),
    }),
    onError,
  });
