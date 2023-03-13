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

export type PaginationMove = 'prev' | 'next';

export type PaginationMoveState = PaginationMove | 'prev-next' | 'none';

export type ResultImagesUI = Readonly<{
  images: ImagesUI;
  pagination: PaginationMoveState;
}>;
