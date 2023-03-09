import { useQuery, UseQueryResult } from '@tanstack/react-query';

import axios from 'axios';
import { Images } from '../../../types-api';
import { ImagesUI } from '../../../types-ui';
import { tranformResponseForUI } from './tranform';
import { ImageSizes } from './type';

const KEY_IMAGES = 'GET_IMAGES';

// TODO handle page and limit https://picsum.photos/v2/list?page=2&limit=100
export const fetchImages = (): Promise<Images> =>
  axios.get('list').then((response) => response.data);

// TODO add error handling cb
export type UseGetImages = (
  params: Readonly<{
    imageSizes: ImageSizes;
    onError: (e: unknown) => void;
  }>
) => UseQueryResult<ImagesUI, unknown>;
export const useGetImages: UseGetImages = ({
  imageSizes: dimensions,
  onError,
}) =>
  useQuery([KEY_IMAGES], fetchImages, {
    select: (x) => tranformResponseForUI(x, dimensions),
    onError,
  });

//UseQueryResult<ImagesUI, unknown>;
