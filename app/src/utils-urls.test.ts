import { ImageSize } from './pages/ImagesPage/useGetImages/type';
import {
  calculateImageSizeAspectRatioFitImage,
  extractImageSizeFromUrl,
  makeUrlWithFitImageSize,
  modifySizeForImageUrl,
  roundImageSize,
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

  describe('calculateImageSizeAspectRatioFitImage', () => {
    it('should resize maintaining aspec ratio', () => {
      const originalAspectRate = 500 / 280;
      const result = calculateImageSizeAspectRatioFitImage({
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

  describe('roundImageSize', () => {
    it('should round image size', () => {
      expect(roundImageSize({ width: 100.2, height: 80.8 })).toEqual({
        width: 100,
        height: 81,
      });
    });
  });

  describe('extractImageSizeFromUrl', () => {
    it('should extract width and height from url', () => {
      // TODO add test unhappy path
      expect(
        extractImageSizeFromUrl('https://picsum.photos/id/103/2592/1936')
      ).toEqual<ImageSize>({
        width: 2592,
        height: 1936,
      });
    });
  });

  describe('makeUrlWithFitImageSizes', () => {
    it('should return an url which fit the desired image sizes maintaining the original aspect ration', () => {
      expect(
        makeUrlWithFitImageSize({
          originalUrl: 'https://picsum.photos/id/103/2592/1936',
          desiredSize: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/149');

      expect(
        makeUrlWithFitImageSize({
          originalUrl: 'https://picsum.photos/id/103/2592/1936',
          desiredSize: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/149');
    });
  });
});
