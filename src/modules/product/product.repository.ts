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
      params: { q, category_ids, store_id },
    } = pagination;

    const query = this.createQueryBuilder('p')
      .innerJoinAndSelect('p.storeOwner', 's')
      .leftJoinAndSelect('p.categories', 'c')
      .leftJoinAndSelect('p.variants', 'v')
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

    if (category_ids?.length) {
      query.where(
        `
          c.id in (:...category_ids)
        `,
        { category_ids },
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
