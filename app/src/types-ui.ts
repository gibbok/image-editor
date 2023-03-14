export type ImageId = string;

export type ImageUI = Readonly<{
  imageId: ImageId;
  author: string;
  urlTransform: string;
}>;

export type ImageInfoUI = ImageUI &
  Readonly<{
    width: number;
    height: number;
  }>;

export type ImagesUI = ReadonlyArray<ImageUI>;
