import { PaginationMoveState } from '../../../types-ui';

export type HideNextPrevButton = Readonly<{
  disableNext: boolean;
  disablePrev: boolean;
}>;
export const disablePrevNextButtons = (
  variant: PaginationMoveState
): HideNextPrevButton => {
  switch (variant) {
    case 'prev-next':
      return {
        disableNext: false,
        disablePrev: false,
      };
    case 'prev':
      return {
        disableNext: true,
        disablePrev: false,
      };
    case 'next':
      return {
        disableNext: false,
        disablePrev: true,
      };
    default:
      return {
        disableNext: true,
        disablePrev: true,
      };
  }
};
