import { ImageSize } from './pages/ImagesPage/useGetImages/type';
import {
  calculateImageSizesAspectRatioFitImage,
  extractImageSizesFromUrl,
  makeUrlWithFitImageSizes,
  modifySizeForImageUrl,
  roundImageSizes,
} from './utils-urls';

describe('utils-urls', () => {
  describe('modifySizeForImageUrl', () => {
    it('should modify url with given width and height', () => {
      expect(
        modifySizeForImageUrl('https://picsum.photos/id/3/5000/3333')({
          width: 200,
          height: 100,
        })
      ).toBe('https://picsum.photos/id/3/200/100');
    });
  });

  describe('calculateImageSizesAspectRatioFitImage', () => {
    it('should resize maintaining aspec ratio', () => {
      const originalAspectRate = 500 / 280;
      const result = calculateImageSizesAspectRatioFitImage({
        width: 200,
        height: 160,
      })({ width: 500, height: 280 });

      expect(result).toEqual<ImageSize>({
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
      // TODO add test unhappy path
      expect(
        extractImageSizesFromUrl('https://picsum.photos/id/103/2592/1936')
      ).toEqual<ImageSize>({
        width: 2592,
        height: 1936,
      });
    });
  });

  describe('makeUrlWithFitImageSizes', () => {
    it('should return an url which fit the desired image sizes maintaining the original aspect ration', () => {
      expect(
        makeUrlWithFitImageSizes({
          originalUrl: 'https://picsum.photos/id/103/2592/1936',
          desiredSizes: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/149');

      expect(
        makeUrlWithFitImageSizes({
          originalUrl: 'https://picsum.photos/id/103/2592/1936',
          desiredSizes: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/149');
    });
  });
});
