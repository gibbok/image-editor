import React from 'react';
import {
  Box,
  Button,
  Pagination as PaginationMUI,
  Typography,
} from '@mui/material';

import { Pagination } from '../../types-ui';

type ClickOn = 'prev' | 'next';
type PaginationProps = Readonly<{
  page: number;
  variant: Pagination;
  onChange: (clickOn: ClickOn) => void;
}>;

export type HideNextPrevButton = Readonly<{
  hideNextButton: boolean;
  hidePrevButton: boolean;
}>;
export const hideNextPrevButton = (variant: Pagination): HideNextPrevButton => {
  switch (variant) {
    case 'prev-next':
      return {
        hideNextButton: false,
        hidePrevButton: false,
      };
    case 'prev':
      return {
        hideNextButton: true,
        hidePrevButton: false,
      };
    case 'next':
      return {
        hideNextButton: false,
        hidePrevButton: true,
      };
    default:
      return {
        hideNextButton: true,
        hidePrevButton: true,
      };
  }
};

export const Paginator = ({ page, variant, onChange }: PaginationProps) => {
  const x = hideNextPrevButton(variant);

  const handleClickButton = (clickOn: ClickOn) => () => {
    onChange(clickOn);
  };

  return (
    <Box display={'flex'}>
      <Typography variant="body2">Page: {page}</Typography>

      <Button
        variant="outlined"
        disabled={x.hidePrevButton}
        onClick={handleClickButton('prev')}
      >
        Prev
      </Button>
      <Button
        variant="outlined"
        disabled={x.hideNextButton}
        onClick={handleClickButton('next')}
      >
        Next
      </Button>
    </Box>
  );
};
