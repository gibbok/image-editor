import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Image } from '../../../types-api';
import { ImagesUI, ImageUI } from '../../../types-ui';
import {
  getResizedUrl,
  tranformResponseForUI,
} from '../../ImagesPage/useGetImages/tranform';

const KEY_IMAGES = 'GET_IMAGE_DETAILS';

export const fetchImageDetails = ({
  imageId,
}: Readonly<{ imageId: string }>): Promise<Image> =>
  axios.get(`id/${imageId}/info`).then((response) => response.data);

export type UseGetImageInfo = (
  params: Readonly<{
    imageId: string;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ImageUI, unknown>;

// https://picsum.photos/id/989/info
export const useGetImageDetails: UseGetImageInfo = ({ imageId, onError }) =>
  useQuery([KEY_IMAGES, { imageId }], () => fetchImageDetails({ imageId }), {
    select: (data) => {
      return {
        id: data.id,
        author: data.author,
        urlResized: getResizedUrl(data.download_url, {
          width: 400,
          height: 350,
        }),
      };
    }, // TODO remome
    onError,
  });
