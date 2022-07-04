import { PaginationRequest } from '@/libs/pagitation';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { QueryOrdersRequestDto } from './dtos';
import { OrderEntity } from './order.entity';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  /**
   * Get products list
   * @param pagination {PaginationRequest}
   * @returns [orderEntities: OrderEntity[], totalOrders: number]
   */
  public async getProductsAndCount(
    pagination: PaginationRequest<QueryOrdersRequestDto>,
  ): Promise<[orderEntities: OrderEntity[], totalOrders: number]> {
    const {
      skip,
      limit: take,
      order,
      params: { customer, fromDate, toDate, status, trx_id },
    } = pagination;
    const query = this.createQueryBuilder('p')
      .innerJoinAndSelect('p.storeOwner', 's')
      .leftJoinAndSelect('p.category', 'c')
      .skip(skip)
      .take(take)
      .orderBy(order);

    // if (q) {
    //   query.where(
    //     `
    //       p.title ILIKE :q
    //     `,
    //     { q: `%${q}%` },
    //   );
    // }

    // if (category_id) {
    //   query.where(
    //     `
    //       p.category = :category_id
    //     `,
    //     { category_id: `${category_id}` },
    //   );
    // }

    // if (store_id) {
    //   query.where(
    //     `
    //       p.storeOwner = :store_id
    //     `,
    //     { store_id: `${store_id}` },
    //   );
    // }

    return query.getManyAndCount();
  }
}

export const OrderRepositoryProvider = {
  provide: 'OrdersRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(OrdersRepository),
  inject: [Connection],
};
