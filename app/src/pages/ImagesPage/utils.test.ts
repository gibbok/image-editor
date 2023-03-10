import { getPageFromPageParams, makeEditorUrl } from './utils';

describe('utils', () => {
  describe('getPageFromPageParams', () => {
    it('should return a valid page number or a default one from query string', () => {
      expect(getPageFromPageParams('77')).toBe(77);
      expect(getPageFromPageParams('xxx')).toBe(1);
      expect(getPageFromPageParams('undefined')).toBe(1);
      expect(getPageFromPageParams('null')).toBe(1);
      expect(getPageFromPageParams(null)).toBe(1);
    });
  });

  describe('makeEditorUrl', () => {
    it('should return editor url', () => {
      expect(makeEditorUrl('125')).toBe('/editor?id=125');
    });
  });
});
