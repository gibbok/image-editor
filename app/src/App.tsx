import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ImagesPage } from './pages/ImagesPage/ImagesPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ImagesPage />
    </QueryClientProvider>
  );
};

export default App;
