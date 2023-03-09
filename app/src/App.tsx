import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return <QueryClientProvider client={queryClient}>hello</QueryClientProvider>;
};

export default App;
