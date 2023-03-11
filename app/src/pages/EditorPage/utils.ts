export const getImageIdFromImageIdQueryParam = (imageIdStr: string | null) => {
  const DEFAULT_IMAGE_ID = '1'; // TODO change this
  if (imageIdStr === null) {
    return DEFAULT_IMAGE_ID;
  }
  return imageIdStr;
};

export const makeEditorPageQueryParam = ({
  width,
  height,
  isGrayscale,
  blur,
}: Readonly<{
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: number;
}>) =>
  `?${new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    gray: isGrayscale.toString(),
    blur: blur.toString(),
  })}`;
