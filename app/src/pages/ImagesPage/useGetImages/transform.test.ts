import { Images } from '../../../types-api';
import { ImagesUI, PaginationMoveState } from '../../../types-ui';
import {
  getPaginationInfoFromHeader,
  modifySizeForImageUrl,
  tranformResponseForUI,
  calculateImageSizesAspectRatioFitImage,
  extractImageSizesFromUrl,
  roundImageSizes,
  getResizedUrl,
} from './tranform';
import { ImageSizes } from './type';

describe('transform', () => {
  describe('modifySizeForImageUrl', () => {
    // TODO add more test here
    it('should modify url with given width and height', () => {
      expect(
        modifySizeForImageUrl('https://picsum.photos/id/3/5000/3333')({
          width: 200,
          height: 100,
        })
      ).toBe('https://picsum.photos/id/3/200/100');
    });
  });

  describe('getPaginationInfoFromHeader', () => {
    const cases: ReadonlyArray<[string, PaginationMoveState]> = [
      ['<https://picsum.photos/v2/list?page=2&limit=30>; rel="next"', 'next'],
      [
        '<https://picsum.photos/v2/list?page=1&limit=30>; rel="prev", <https://picsum.photos/v2/list?page=3&limit=30>; rel="next"',
        'prev-next',
      ],
      [
        '<https://picsum.photos/v2/list?page=9999999&limit=30>; rel="prev"',
        'prev',
      ],
      ['<https://picsum.photos/v2/list?page=1&limit=30>;', 'none'],
    ];

    test.each(cases)(
      'link header %p, returns pagination %p',
      (firstArg, expectedResult) =>
        expect(getPaginationInfoFromHeader(firstArg)).toBe(expectedResult)
    );
  });

  describe('tranformResponseForUI', () => {
    it('should transform server response to data for ui', () => {
      const reponseServer: Images = [
        {
          id: '102',
          author: 'Ben Moore',
          width: 4320,
          height: 3240,
          url: 'https://unsplash.com/photos/pJILiyPdrXI',
          download_url: 'https://picsum.photos/id/102/4320/3240',
        },
        {
          id: '103',
          author: 'Ilham Rahmansyah',
          width: 2592,
          height: 1936,
          url: 'https://unsplash.com/photos/DwTZwZYi9Ww',
          download_url: 'https://picsum.photos/id/103/2592/1936',
        },
      ];

      expect(
        tranformResponseForUI(reponseServer, { width: 100, height: 80 })
      ).toEqual<ImagesUI>([
        {
          author: 'Ben Moore',
          imageId: '102',
          urlTransform: 'https://picsum.photos/id/102/100/75',
        },
        {
          author: 'Ilham Rahmansyah',
          imageId: '103',
          urlTransform: 'https://picsum.photos/id/103/100/75',
        },
      ]);
    });
  });

  describe('calculateImageSizesAspectRatioFitImage', () => {
    it('should resize maintaining aspec ratio', () => {
      const originalAspectRate = 500 / 280;
      const result = calculateImageSizesAspectRatioFitImage({
        width: 200,
        height: 160,
      })({ width: 500, height: 280 });

      expect(result).toEqual<ImageSizes>({
        width: 200,
        height: 112,
      });
      expect(result.width / result.height).toBe(originalAspectRate);
    });
  });

  describe('roundImageSizes', () => {
    it('should round image sizes', () => {
      expect(roundImageSizes({ width: 100.2, height: 80.8 })).toEqual({
        width: 100,
        height: 81,
      });
    });
  });

  describe('extractImageSizesFromUrl', () => {
    it('should extract width and height from url', () => {
      expect(
        extractImageSizesFromUrl('https://picsum.photos/id/103/2592/1936')
      ).toEqual<ImageSizes>({
        width: 2592,
        height: 1936,
      });
      // TOD add example of bad case use default value
    });
  });

  describe('getResizedUrl', () => {
    it('should return an url which fit the desired image size with grayscale and blur', () => {
      expect(
        getResizedUrl({
          originalUrl: 'https://picsum.photos/id/103/2592/1936',
          desiredResize: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/149');
      expect(
        getResizedUrl({
          originalUrl: 'https://picsum.photos/id/103/2592/1936',
          desiredResize: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/149');
    });
  });
});
