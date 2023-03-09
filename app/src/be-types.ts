export type Image = Readonly<{
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}>;

export type Images = ReadonlyArray<Image>;
