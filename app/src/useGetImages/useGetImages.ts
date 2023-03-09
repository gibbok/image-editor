import { useQuery } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { Images } from '../be-types';

const KEY_IMAGES = 'GET_IMAGES';

export const fetchImages = () => axios.get<Images, Error | AxiosError>('list');

export const useGetImages = () => useQuery([KEY_IMAGES], fetchImages);
