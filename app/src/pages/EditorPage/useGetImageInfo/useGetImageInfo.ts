import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from '../../../types-api';
import { ImageId, ImageInfoUI } from '../../../types-ui';
import {
  calculateImageSizesAspectRatioFitImage,
  extractImageSizesFromUrl,
  getResizedUrl,
  getResizedUrl2,
  roundImageSizes,
} from '../../ImagesPage/useGetImages/tranform';
import { pipe } from 'fp-ts/lib/function';
import { ImagePropertiesForChange } from '../types';

const KEY_IMAGES = 'GET_IMAGE_DETAILS';

export const fetchImageDetails = ({
  imageId,
}: Readonly<{ imageId: ImageId }>): Promise<Image> =>
  axios.get(`id/${imageId}/info`).then((response) => response.data);

export type UseGetImageInfo = (
  params: ImagePropertiesForChange &
    Readonly<{
      imageId: ImageId;
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
  useQuery([KEY_IMAGES, { imageId }], () => fetchImageDetails({ imageId }), {
    select: (data) => {
      const { width: widthResized, height: heightResized } = pipe(
        data.download_url,
        extractImageSizesFromUrl,
        calculateImageSizesAspectRatioFitImage({
          width,
          height,
        }),
        roundImageSizes
      );
      return {
        imageId: data.id,
        author: data.author,
        width: widthResized,
        height: heightResized,
        urlTransform: getResizedUrl({
          originalUrl: data.download_url,
          desiredResize: {
            width: widthResized,
            height: heightResized,
          },
          isGrayscale,
          blur,
        }),
      };
    },
    onError,
  });
