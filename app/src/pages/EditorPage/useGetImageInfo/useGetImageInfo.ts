import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from '../../../types-api';
import { ImageId, ImageInfoUI } from '../../../types-ui';
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
}: Readonly<{ imageId: ImageId }>): Promise<Image> =>
  axios.get(`id/${imageId}/info`).then((response) => response.data);

export type UseGetImageInfo = (
  params: Readonly<{
    imageId: ImageId;
    width: number;
    height: number;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ImageInfoUI, unknown>;

export const useGetImageDetails: UseGetImageInfo = ({
  imageId,
  width,
  height,
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
        }),
      };
    },
    onError,
  });
