import {
  getImagesPageQueryParams,
  makeEditorUrl,
  makeImagesPageQueryParams,
} from './utils';

describe('utils', () => {
  describe('makeEditorUrl', () => {
    it('should return editor url', () => {
      expect(
        makeEditorUrl({
          imageId: '125',
          page: 1,
          width: 800,
          height: 600,
          isGrayscale: false,
          blur: 1,
        })
      ).toBe(
        'editor?imageId=125&page=1&width=800&height=600&grayscale=false&blur=1'
      );
    });
  });

  describe('makeImagesPageQueryParams', () => {
    it('should return query parameter for page', () => {
      expect(makeImagesPageQueryParams(10)).toBe('?page=10');
    });
  });

  describe('getImagesPageQueryParams', () => {
    it('should return query parameter for page', () => {
      const url = new URL('http://localhost:3000/?page=2');
      expect(getImagesPageQueryParams(url.searchParams)).toEqual({ page: 2 });
    });
  });
});
