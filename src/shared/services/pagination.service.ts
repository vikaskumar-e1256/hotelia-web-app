import { Injectable } from '@nestjs/common';
import { PaginationResult } from '../interfaces/pagination-result.interface';

@Injectable()
export class PaginationService {
  createPaginationResult<T>(
    data: T[],
    totalItems: number,
    currentPage: number,
    itemsPerPage: number,
    baseUrl: string
  ): PaginationResult<T> {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const links = {
      previous: currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}&limit=${itemsPerPage}` : undefined,
      next: currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}&limit=${itemsPerPage}` : undefined,
    };

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage,
        totalPages,
        currentPage,
      },
      links,
    };
  }
}
