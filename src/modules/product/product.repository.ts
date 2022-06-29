import { PaginationRequest } from '@/libs/pagitation';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { QueryProductsRequestDto } from './dtos';
import { ProductEntity } from './product.entity';

@EntityRepository(ProductEntity)
export class ProductsRepository extends Repository<ProductEntity> {
  /**
   * Get products list
   * @param pagination {PaginationRequest}
   * @returns [productEntities: ProductEntity[], totalProducts: number]
   */
  public async getProductsAndCount(
    pagination: PaginationRequest<QueryProductsRequestDto>,
  ): Promise<[productEntities: ProductEntity[], totalProducts: number]> {
    const {
      skip,
      limit: take,
      order,
      params: { q, category_id, store_id },
    } = pagination;
    const query = this.createQueryBuilder('p')
      .innerJoinAndSelect('p.storeOwner', 's')
      .leftJoinAndSelect('p.category', 'c')
      .skip(skip)
      .take(take)
      .orderBy(order);

    if (q) {
      query.where(
        `
          p.title ILIKE :q
        `,
        { q: `%${q}%` },
      );
    }

    if (category_id) {
      query.where(
        `
          p.category = :category_id
        `,
        { category_id: `${category_id}` },
      );
    }

    if (store_id) {
      query.where(
        `
          p.storeOwner = :store_id
        `,
        { store_id: `${store_id}` },
      );
    }

    return query.getManyAndCount();
  }
}

export const ProductRepositoryProvider = {
  provide: 'ProductsRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(ProductsRepository),
  inject: [Connection],
};
