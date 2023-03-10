import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { PaginationMoveState, PaginationMove } from '../../../types-ui';
import { disablePrevNextButtons } from './utils';

type PaginationProps = Readonly<{
  page: number;
  variant: PaginationMoveState;
  onChange: (movement: PaginationMove) => void;
}>;

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
