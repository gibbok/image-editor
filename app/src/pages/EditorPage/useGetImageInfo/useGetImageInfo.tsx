import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from '../../../types-api';
import { ImageUI } from '../../../types-ui';
import { getResizedUrl } from '../../ImagesPage/useGetImages/tranform';
import { ImageSizes } from '../../ImagesPage/useGetImages/type';

const KEY_IMAGES = 'GET_IMAGE_DETAILS';

export const fetchImageDetails = ({
  imageId,
}: Readonly<{ imageId: string }>): Promise<Image> =>
  axios.get(`id/${imageId}/info`).then((response) => response.data);

export type UseGetImageInfo = (
  params: Readonly<{
    imageId: string;
    imageSizes: ImageSizes;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ImageUI, unknown>;

export const useGetImageDetails: UseGetImageInfo = ({
  imageId,
  imageSizes,
  onError,
}) =>
  useQuery([KEY_IMAGES, { imageId }], () => fetchImageDetails({ imageId }), {
    select: (data) => {
      return {
        id: data.id,
        author: data.author,
        urlResized: getResizedUrl(data.download_url, imageSizes),
      };
    },
    onError,
  });
