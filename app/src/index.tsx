import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';
import { initApp } from './init';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { EditorPage } from './pages/EditorPage/EditorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ContainerImagesPage } from './pages/ImagesPage/ContainerImagesPage';
import { logError } from './utils';

initApp();

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout title="Image Editor">
        <ContainerImagesPage />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/editor',
    element: (
      <Layout title="Edit image">
        <EditorPage />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') ??
    (() => {
      const message = 'Missing root';
      logError(message);
      throw new Error(message);
    })()
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
