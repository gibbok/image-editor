import { Images } from '../../../types-api';
import { ImagesUI } from '../../../types-ui';
import { PaginationMoveState } from '../types';
import { getPaginationInfoFromHeader, tranformResponseForUI } from './tranform';

describe('transform', () => {
  describe('getPaginationInfoFromHeader', () => {
    const cases: ReadonlyArray<[string, PaginationMoveState]> = [
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
        expect(getPaginationInfoFromHeader(firstArg)).toBe(expectedResult)
    );
  });

  describe('tranformResponseForUI', () => {
    it('should transform server response to data for ui', () => {
      const reponseServer: Images = [
        {
          id: '102',
          author: 'Ben Moore',
          width: 4320,
          height: 3240,
          url: 'https://unsplash.com/photos/pJILiyPdrXI',
          download_url: 'https://picsum.photos/id/102/4320/3240',
        },
        {
          id: '103',
          author: 'Ilham Rahmansyah',
          width: 2592,
          height: 1936,
          url: 'https://unsplash.com/photos/DwTZwZYi9Ww',
          download_url: 'https://picsum.photos/id/103/2592/1936',
        },
      ];

      expect(
        tranformResponseForUI(reponseServer, { width: 100, height: 80 })
      ).toEqual<ImagesUI>([
        {
          author: 'Ben Moore',
          imageId: '102',
          urlTransform: 'https://picsum.photos/id/102/100/80',
        },
        {
          author: 'Ilham Rahmansyah',
          imageId: '103',
          urlTransform: 'https://picsum.photos/id/103/100/80',
        },
      ]);
    });
  });
});
