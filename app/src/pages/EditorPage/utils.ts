export const getImageIdFromImageIdQueryParam = (imageIdStr: string | null) => {
  const DEFAULT_IMAGE_ID = '1'; // TODO change this
  if (imageIdStr === null) {
    return DEFAULT_IMAGE_ID;
  }
  return imageIdStr;
};

type BlurValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const makeEditorPageQueryParam = ({
  width,
  height,
  isGrayscale,
  blur,
}: Readonly<{
  width: number;
  height: number;
  isGrayscale: boolean;
  blur: BlurValue;
}>) =>
  `?${new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    gray: isGrayscale.toString(),
    blur: blur.toString(),
  })}`;
