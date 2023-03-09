export type ImageUI = Readonly<{
  id: string;
  author: string;
  urlResized: string;
}>;

export type ImagesUI = ReadonlyArray<ImageUI>;

export type PaginationMove = 'prev' | 'next';

export type Pagination = PaginationMove | 'prev-next' | 'none';

export type ResultImagesUI = Readonly<{
  images: ImagesUI;
  pagination: Pagination;
}>;
