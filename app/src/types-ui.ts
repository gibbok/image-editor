export type ImageUI = Readonly<{
  id: string;
  author: string;
  urlResized: string;
}>;

export type ImagesUI = ReadonlyArray<ImageUI>;
