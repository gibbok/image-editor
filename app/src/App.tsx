import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Images } from './Images';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Images />
    </QueryClientProvider>
  );
};

export default App;
