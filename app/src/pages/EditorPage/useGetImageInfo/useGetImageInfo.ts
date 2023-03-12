import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from '../../../types-api';
import { ImageId, ImageInfoUI } from '../../../types-ui';
import { getResizedUrl } from '../../ImagesPage/useGetImages/tranform';
import { calculateImageSizeForPreviewImage } from './utils';

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
      const { width: widthResized, height: heightResized } =
        calculateImageSizeForPreviewImage(
          data.download_url,
          previewWidth,
          previewHeight
        );

      return {
        imageId: data.id,
        author: data.author,
        width: widthResized,
        height: heightResized,
        urlTransform: getResizedUrl({
          originalUrl: data.download_url,
          desiredSizes: {
            width: widthResized,
            height: heightResized,
          },
        }),
      };
    },
    onError,
  });
