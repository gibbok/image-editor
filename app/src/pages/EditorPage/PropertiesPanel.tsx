import React from 'react';
import { ImagePropertiesForChange } from './types';

type PropertiesPanelProps = ImagePropertiesForChange &
  Readonly<{
    onReset: () => void;
    onApply: (propsChange: ImagePropertiesForChange) => void;
    onDownload: (propsChange: ImagePropertiesForChange) => {};
  }>;

export const PropertiesPanel = ({
  width,
  height,
  isGrayscale,
  blur: blue,
}: PropertiesPanelProps) => {
  return <div>PropertiePanel</div>;
};
