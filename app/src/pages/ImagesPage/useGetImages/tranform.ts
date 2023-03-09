// https://picsum.photos/id/1/5000/3333

import { Images } from '../../../types-api';
import { ImagesUI } from '../../../types-ui';
import { ImageSizes } from './type';

export const modifySizeForImageUrl = (
  url: string,
  { width, height }: ImageSizes
) => url.replace(/\d+\/\d+$/, width + '/' + height);

export const tranformResponseForUI = (
  response: Images,
  desiredResize: ImageSizes
): ImagesUI =>
  response.map(({ id, author, download_url }) => ({
    id,
    author,
    urlResized: modifySizeForImageUrl(download_url, desiredResize),
  }));
