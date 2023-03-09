import React from 'react';
import { useGetImages } from './useGetImages/useGetImages';

export const Images = () => {
  const { data, isLoading } = useGetImages();

  return <div>{isLoading ? 'loading' : JSON.stringify(data)}</div>;
};
