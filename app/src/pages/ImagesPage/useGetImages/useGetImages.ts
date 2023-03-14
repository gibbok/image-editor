import { useQuery, UseQueryResult } from '@tanstack/react-query';

import axios from 'axios';
import { API_VERSION, LIST_THUMBNAILS_AMOUNT_PER_PAGE } from '../../../config';
import { ImagesAndLink } from '../../../types-api';
import { ResultImagesUI } from '../types';
import { getPaginationInfoFromHeader, tranformResponseForUI } from './tranform';
import { ImageSize } from './type';

const KEY_IMAGES = 'GET_IMAGES';

export const fetchImages = ({
  page,
}: Readonly<{ page: number }>): Promise<ImagesAndLink> =>
  axios
    .get(
      `${API_VERSION}/list?page=${page}&limit=${LIST_THUMBNAILS_AMOUNT_PER_PAGE}`
    )
    .then((response) => ({
      images: response.data,
      linkHeader: response.headers.link,
    }));

export type UseGetImages = (
  params: Readonly<{
    imageSize: ImageSize;
    page: number;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ResultImagesUI, unknown>;
export const useGetImages: UseGetImages = ({ imageSize, page, onError }) =>
  useQuery([KEY_IMAGES, { page }], () => fetchImages({ page }), {
    select: (data) => ({
      images: tranformResponseForUI(data.images, imageSize),
      pagination: getPaginationInfoFromHeader(data.linkHeader),
    }),
    onError,
  });
