import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';
import { configApp } from './config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { EditorPage } from './pages/EditorPage/EditorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ImagesPage } from './pages/ImagesPage/ImagesPage';

configApp();

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <ImagesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/editor',
    element: <EditorPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
