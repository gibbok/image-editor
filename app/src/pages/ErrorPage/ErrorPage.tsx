import { Box } from '@mui/material';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { logError } from '../../utils';

export default function ErrorPage() {
  const error = useRouteError();

  logError(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Box>
        <ErrorMessage />
        {error.status} {error.statusText}
      </Box>
    );
  }

  if (error instanceof Error) {
    return <Box>{error.message}</Box>;
  }

  return <Box>Unknown Error</Box>;
}
