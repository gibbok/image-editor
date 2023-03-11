import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from '../../../types-api';
import { ImageInfoUI } from '../../../types-ui';
import {
  calculateImageSizesAspectRatioFitImage,
  extractImageSizesFromUrl,
  getResizedUrl,
  roundImageSizes,
} from '../../ImagesPage/useGetImages/tranform';
import { pipe } from 'fp-ts/lib/function';

const KEY_IMAGES = 'GET_IMAGE_DETAILS';

export const fetchImageDetails = ({
  imageId,
}: Readonly<{ imageId: string }>): Promise<Image> =>
  axios.get(`id/${imageId}/info`).then((response) => response.data);

export type UseGetImageInfo = (
  params: Readonly<{
    imageId: string;
    width: number;
    height: number;
    isGrayscale: boolean;
    blur: number;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ImageInfoUI, unknown>;

export const useGetImageDetails: UseGetImageInfo = ({
  imageId,
  width,
  height,
  isGrayscale,
  blur,
  onError,
}) =>
  useQuery(
    [KEY_IMAGES, { imageId, width, height, isGrayscale, blur }],
    () => fetchImageDetails({ imageId }),
    {
      select: (data) => {
        const { width: widthResized, height: heightResized } = pipe(
          data.download_url,
          extractImageSizesFromUrl,
          calculateImageSizesAspectRatioFitImage({ width, height }),
          roundImageSizes
        );
        return {
          id: data.id,
          author: data.author,
          width: widthResized,
          height: heightResized,
          urlTransform: getResizedUrl(data.download_url, {
            width: widthResized,
            height: heightResized,
          }),
        };
      },
      onError,
    }
  );
