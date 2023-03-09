import { modifySizeForImageUrl } from './tranform';

describe('transform', () => {
  describe('modifySizeForImageUrl', () => {
    // TODO add more test here
    it('should modify url with given width and height', () => {
      expect(
        modifySizeForImageUrl('https://picsum.photos/id/3/5000/3333', {
          width: 200,
          height: 100,
        })
      ).toBe('https://picsum.photos/id/3/200/100');
    });
  });
});
// TODO fix jest tests
