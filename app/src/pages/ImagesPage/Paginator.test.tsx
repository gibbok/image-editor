import { Pagination } from '../../types-ui';
import { HideNextPrevButton, disablePrevNextButtons } from './Paginator';

describe('Paginator', () => {
  describe('handleChangePage', () => {
    const cases: ReadonlyArray<[Pagination, HideNextPrevButton]> = [
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
