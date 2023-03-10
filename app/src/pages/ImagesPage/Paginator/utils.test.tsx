import { PaginationMoveState } from '../../../types-ui';
import { disablePrevNextButtons, HideNextPrevButton } from './utils';

describe('Paginator', () => {
  describe('handleChangePage', () => {
    const cases: ReadonlyArray<[PaginationMoveState, HideNextPrevButton]> = [
      ['prev-next', { disableNext: false, disablePrev: false }],
      ['prev', { disableNext: true, disablePrev: false }],
      ['next', { disableNext: false, disablePrev: true }],
      ['none', { disableNext: true, disablePrev: true }],
    ];

    test.each(cases)(
      'variant pagination %p, returns %p',
      (firstArg, expectedResult) =>
        expect(disablePrevNextButtons(firstArg)).toEqual(expectedResult)
    );
  });
});
