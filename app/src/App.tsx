import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ImagesPage } from './pages/ImagesPage/ImagesPage';
import { ErrorBoundary } from './ErrorBoundary';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ImagesPage />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
