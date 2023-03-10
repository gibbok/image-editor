import {
  getPageFromPageQueryParam,
  makeEditorUrl,
  makePageQueryParam,
} from './utils';

describe('utils', () => {
  describe('getPageFromPageQueryParam', () => {
    it('should return a valid page number or a default one from query string', () => {
      expect(getPageFromPageQueryParam('77')).toBe(77);
      expect(getPageFromPageQueryParam('xxx')).toBe(1);
      expect(getPageFromPageQueryParam('undefined')).toBe(1);
      expect(getPageFromPageQueryParam('null')).toBe(1);
      expect(getPageFromPageQueryParam(null)).toBe(1);
    });
  });

  describe('makeEditorUrl', () => {
    it('should return editor url', () => {
      expect(makeEditorUrl('125')).toBe('editor?id=125');
    });
  });

  describe('makePageQueryParam', () => {
    it('should return query parameter for page', () => {
      expect(makePageQueryParam(10)).toBe('?page=10');
    });
  });
});
