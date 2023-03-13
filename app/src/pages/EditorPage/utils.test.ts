import {
  getEditorPageQueryParams,
  makeEditorPageQueryParams,
  makeFileName,
} from './utils';

describe('utils', () => {
  describe('makeEditorPageQueryParams', () => {
    it('should make query params for editor page', () => {
      expect(
        makeEditorPageQueryParams({
          imageId: '1',
          page: 1,
          width: 800,
          height: 600,
          isGrayscale: false,
          blur: 1,
        })
      ).toBe('?imageId=1&page=1&width=800&height=600&grayscale=false&blur=1');
    });
  });

  describe('getEditorPageQueryParams', () => {
    it('should get query params for editor page', () => {
      const url = new URL(
        'http://localhost:3000/editor?imageId=61&page=2&width=800&height=600&grayscale=false&blur=1'
      );

      expect(getEditorPageQueryParams(url.searchParams)).toEqual({
        blur: 1,
        height: 600,
        imageId: '61',
        isGrayscale: false,
        page: 2,
        width: 800,
      });
    });

    it('should get query params for editor page using default when query params are invalid', () => {
      const url = new URL(
        'http://localhost:3000/editor?imageId=61.5&page=2.5&width=&height=&grayscale=xxx&blur='
      );

      expect(getEditorPageQueryParams(url.searchParams)).toEqual({
        imageId: '1',
        page: 1,
        width: 650,
        height: 450,
        isGrayscale: false,
        blur: 1,
      });
    });
  });

  describe('makeFileName', () => {
    expect(
      makeFileName('image-editor')({
        width: 800,
        height: 600,
        isGrayscale: false,
        blur: 1,
        imageId: '1',
      })
    ).toEqual('image-editor-1-width-800-height-600-blur-1');
  });
});
