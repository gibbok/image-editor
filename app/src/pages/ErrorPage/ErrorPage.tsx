import { Box } from '@mui/material';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Box>
        {error.status} {error.statusText}
      </Box>
    );
  }

  if (error instanceof Error) {
    return <Box>{error.message}</Box>;
  }

  return <Box>Unknown Error</Box>;
}
