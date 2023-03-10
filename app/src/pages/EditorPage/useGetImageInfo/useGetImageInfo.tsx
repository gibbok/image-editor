import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Image } from '../../../types-api';

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
) => UseQueryResult<Image, unknown>;

// https://picsum.photos/id/989/info
export const useGetImageDetails: UseGetImageInfo = ({ imageId, onError }) =>
  useQuery([KEY_IMAGES, { imageId }], () => fetchImageDetails({ imageId }), {
    select: (data) => data, // TODO remome
    onError,
  });
