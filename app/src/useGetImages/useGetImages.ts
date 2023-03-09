import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { Images } from '../be-types';

const KEY_IMAGES = 'GET_IMAGES';

export const fetchImages = (): Promise<Images> =>
  axios.get('list').then((response) => response.data);

// TODO add error handling cb
export const useGetImages = () => useQuery([KEY_IMAGES], fetchImages);
