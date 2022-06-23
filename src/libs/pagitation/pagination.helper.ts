import { PaginationRequest } from './interfaces';
import { PaginationResponseDto } from './pagination-response.dto';

export class Pagination {
  static of<T, Q>(
    { limit, page, skip }: PaginationRequest<Q>,
    totalRecords: number,
    dtos: T[],
  ): PaginationResponseDto<T> {
    const totalPages =
      Math.floor(totalRecords / limit) + (totalRecords % limit > 0 ? 1 : 0);
    const currentPage = +page > 0 ? page : 1;
    const hasNext = currentPage <= totalPages - 1;

    return {
      totalPages,
      payloadSize: dtos.length,
      hasNext: hasNext,
      content: dtos,
      currentPage: currentPage,
      skippedRecords: skip,
      totalRecords: totalRecords,
    };
  }
}
