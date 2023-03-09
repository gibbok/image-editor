import { Pagination } from '../../../types-ui';
import {
  getPaginationStateFromHeader,
  modifySizeForImageUrl,
} from './tranform';

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

  describe('getPaginationStateFromHeader', () => {
    const cases: ReadonlyArray<[string, Pagination]> = [
      ['<https://picsum.photos/v2/list?page=2&limit=30>; rel="next"', 'next'],
      [
        '<https://picsum.photos/v2/list?page=1&limit=30>; rel="prev", <https://picsum.photos/v2/list?page=3&limit=30>; rel="next"',
        'prev-next',
      ],
      [
        '<https://picsum.photos/v2/list?page=9999999&limit=30>; rel="prev"',
        'prev',
      ],
      ['<https://picsum.photos/v2/list?page=1&limit=30>;', 'none'],
    ];

    test.each(cases)(
      'link header %p, returns pagination %p',
      (firstArg, expectedResult) =>
        expect(getPaginationStateFromHeader(firstArg)).toBe(expectedResult)
    );
  });
});
