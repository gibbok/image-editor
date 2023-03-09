export type ImageUI = Readonly<{
  id: string;
  author: string;
  urlResized: string;
}>;

export type ImagesUI = ReadonlyArray<ImageUI>;

export type Pagination = 'prev' | 'next' | 'prev-next' | 'none';

export type ResultImagesUI = Readonly<{
  images: ImagesUI;
  pagination: Pagination;
}>;

// prev/next/prev/
// <https://picsum.photos/v2/list?page=3&limit=30>; rel="prev", <https://picsum.photos/v2/list?page=5&limit=30>; rel="next"
