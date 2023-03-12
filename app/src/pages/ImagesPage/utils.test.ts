import { makeEditorUrl, makePageQueryParam } from './utils';

describe('utils', () => {
  describe('makeEditorUrl', () => {
    it('should return editor url', () => {
      expect(makeEditorUrl('125', 1)).toBe(
        'editor?imageId=125&page=1&width=800&height=600&grayscale=false&blur=1'
      );
    });
  });

  describe('makePageQueryParam', () => {
    it('should return query parameter for page', () => {
      expect(makePageQueryParam(10)).toBe('?page=10');
    });
  });
});
