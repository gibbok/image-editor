import { ImageSize } from './pages/ImagesPage/useGetImages/type';
import {
  calculateImageSizeAspectRatioFitImage,
  makeUrlWithFitImageSize,
  makeUrlForImage,
} from './utils';

describe('utils', () => {
  describe('modifySizeForImageUrl', () => {
    it('should modify url with given width and height', () => {
      expect(
        makeUrlForImage('3')({
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

  describe('makeUrlWithFitImageSizes', () => {
    it('should return an url which fit the desired image sizes maintaining the original aspect ration', () => {
      expect(
        makeUrlWithFitImageSize({
          imageId: '103',
          currentSize: {
            width: 2592,
            height: 1936,
          },
          desiredSize: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/160');

      expect(
        makeUrlWithFitImageSize({
          imageId: '103',
          currentSize: {
            width: 2592,
            height: 1936,
          },
          desiredSize: {
            width: 200,
            height: 160,
          },
        })
      ).toBe('https://picsum.photos/id/103/200/160');
    });
  });
});
