import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from '../../../types-api';
import { ImageId, ImageInfoUI } from '../../../types-ui';
import {
  calculateImageSizeAspectRatioFitImage,
  makeUrlWithFitImageSize,
} from '../../../utils';

const KEY_IMAGES = 'GET_IMAGE_DETAILS';

export const fetchImageDetails = ({
  imageId,
}: Readonly<{ imageId: ImageId }>): Promise<Image> =>
  axios.get(`id/${imageId}/info`).then((response) => response.data);

export type UseGetImageInfo = (
  params: Readonly<{
    imageId: ImageId;
    previewWidth: number;
    previewHeight: number;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ImageInfoUI, unknown>;

export const useGetImageDetails: UseGetImageInfo = ({
  imageId,
  previewWidth,
  previewHeight,
  onError,
}) =>
  useQuery([KEY_IMAGES, { imageId }], () => fetchImageDetails({ imageId }), {
    select: (data) => {
      const { width: resizedWidth, height: resizedHeight } =
        calculateImageSizeAspectRatioFitImage({
          width: previewWidth,
          height: previewHeight,
        })({ width: data.width, height: data.height });

      return {
        imageId: data.id,
        author: data.author,
        width: resizedWidth,
        height: resizedHeight,
        urlTransform: makeUrlWithFitImageSize({
          imageId: data.id,
          currentSize: {
            width: data.width,
            height: data.height,
          },
          desiredSize: {
            width: resizedWidth,
            height: resizedHeight,
          },
        }),
      };
    },
    onError,
  });
