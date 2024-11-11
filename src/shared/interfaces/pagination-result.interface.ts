export interface PaginationResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links?: {
    previous?: string;
    next?: string;
  };
}
