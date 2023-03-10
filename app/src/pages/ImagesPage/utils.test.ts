import { getPageFromPageParams } from './utils';

describe('utils', () => {
  describe('getPageFromPageParams', () => {
    it('should return a number', () => {
      expect(getPageFromPageParams('77')).toEqual(77);
      expect(getPageFromPageParams('xxx')).toEqual(1);
      expect(getPageFromPageParams('undefined')).toEqual(1);
      expect(getPageFromPageParams('null')).toEqual(1);
      expect(getPageFromPageParams(null)).toEqual(1);
    });
  });
});
