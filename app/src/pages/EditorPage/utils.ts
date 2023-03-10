export const getImageIdFromImageIdQueryParam = (imageIdStr: string | null) => {
  const DEFAULT_IMAGE_ID = '1'; // TODO change this
  if (imageIdStr === null) {
    return DEFAULT_IMAGE_ID;
  }
  return imageIdStr;
};
