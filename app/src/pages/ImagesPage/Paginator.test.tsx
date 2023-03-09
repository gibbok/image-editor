import { Pagination } from '../../types-ui';
import { HideNextPrevButton, hideNextPrevButton } from './Paginator';

describe('Paginator', () => {
  describe('hideNextPrevButton', () => {
    const cases: ReadonlyArray<[Pagination, HideNextPrevButton]> = [
      ['prev-next', { hideNextButton: false, hidePrevButton: false }],
      ['prev', { hideNextButton: true, hidePrevButton: false }],
      ['next', { hideNextButton: false, hidePrevButton: true }],
      ['none', { hideNextButton: true, hidePrevButton: true }],
    ];

    test.each(cases)('link header %p, returns %p', (firstArg, expectedResult) =>
      expect(hideNextPrevButton(firstArg)).toEqual(expectedResult)
    );
  });
});
