import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { Pagination, PaginationMove } from '../../types-ui';

type PaginationProps = Readonly<{
  page: number;
  variant: Pagination;
  onChange: (movement: PaginationMove) => void;
}>;

export type HideNextPrevButton = Readonly<{
  disableNext: boolean;
  disablePrev: boolean;
}>;
export const disablePrevNextButtons = (
  variant: Pagination
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

export const Paginator = ({ page, variant, onChange }: PaginationProps) => {
  const visiblityButton = disablePrevNextButtons(variant);

  const handleClickButton = (clickOn: PaginationMove) => () => {
    onChange(clickOn);
  };

  return (
    <Box display="flex" alignItems="center">
      <Box mr={2}>
        <Button
          variant="outlined"
          disabled={visiblityButton.disablePrev}
          onClick={handleClickButton('prev')}
        >
          Prev
        </Button>
        <Button
          variant="outlined"
          disabled={visiblityButton.disableNext}
          onClick={handleClickButton('next')}
        >
          Next
        </Button>
      </Box>
      <Typography variant="body2">Page: {page}</Typography>
    </Box>
  );
};
