export const getPageFromPageQueryParam = (pageStr: string | null): number => {
  const DEFAULT_PAGE = 1;
  if (pageStr === null) {
    return DEFAULT_PAGE;
  }
  const pageNumber = Number(pageStr);
  return Number.isNaN(pageNumber) ? DEFAULT_PAGE : pageNumber;
};

export const makeEditorUrl = (imageId: string) =>
  `editor?id=${imageId}&width=800&height=600&gray=false&blur=1`; // TODO make it configurable

export const makePageQueryParam = (page: number) =>
  `?${new URLSearchParams({ page: page.toString() })}`;
