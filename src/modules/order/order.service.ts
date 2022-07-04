import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, IsNull, Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CategoryMapper } from './order.mapper';
import { OrderResponseDto, CreateOrderRequestDto } from './dtos';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { OrderLineEntity } from './order-line.entity';
import { GeneratorService } from '@/shared/services/generator.service';
import { ProductStatusType } from '@/constants/product-status-type';
import { OrderStatus } from '@/constants/order-status';
import { CartLineEntity } from '../cart/cart-line.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductVariantEntity)
    private productVariantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(CartLineEntity)
    private cartLineRepository: Repository<CartLineEntity>,
    private connection: Connection,
    private generatorService: GeneratorService,
  ) {}

  async getCategories(): Promise<OrderResponseDto[]> {
    const categoriesEntity = await this.orderRepository.find({
      relations: ['childCategories'],
      where: {
        parent_id: IsNull(),
      },
    });
    return await Promise.all(
      (await categoriesEntity).map(CategoryMapper.toDtoWithRelations),
    );
  }

  async create(
    currentUser: UserEntity,
    { cart }: CreateOrderRequestDto,
  ): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderTime = new Date();

      for (const cartLine of cart) {
        const productVariantIdKeysHaveQuantity = cartLine.items.reduce(
          (result, item) => {
            result[item.product_variant_id] = item.quantity;
            return result;
          },
          {},
        );

        console.log(
          'productVariantIdKeysHaveQuantity====>',
          productVariantIdKeysHaveQuantity,
        );

        const productVariantEntities =
          await this.productVariantRepository.findByIds(
            Object.keys(productVariantIdKeysHaveQuantity),
          );

        const { productVariantsUpdated, orderLines } =
          productVariantEntities.reduce(
            ({ productVariantsUpdated, orderLines }, curr) => {
              const orderLineEntity = new OrderLineEntity();
              orderLineEntity.quantity =
                productVariantIdKeysHaveQuantity[curr.id];
              orderLineEntity.price = curr.price;
              orderLineEntity.product_variant_name = curr.name;

              curr.quantity =
                curr.quantity - productVariantIdKeysHaveQuantity[curr.id];

              return {
                productVariantsUpdated: productVariantsUpdated.concat(curr),
                orderLines: orderLines.concat(orderLineEntity),
              };
            },
            { productVariantsUpdated: [], orderLines: [] },
          );
        console.log('productVariantsUpdated===>', productVariantsUpdated);
        console.log('orderLines====>', orderLines);
        const trxId = `O${this.generatorService.randStr(
          1,
          true,
          false,
          true,
        )}${this.generatorService.randStr(6, true, true, false)}`;

        const subTotal = productVariantEntities.reduce((result, curr) => {
          return (result += curr.price);
        }, 0);

        const TAX = 0;

        const orderEntity = new OrderEntity();
        orderEntity.transaction_id = trxId;
        orderEntity.customer_id = currentUser.id;
        orderEntity.store_id = cartLine.store_id;
        orderEntity.status = OrderStatus.NEW;
        orderEntity.order_date = orderTime;
        orderEntity.subtotal = subTotal;
        orderEntity.tax_amount = TAX;
        orderEntity.total = subTotal + TAX;
        orderEntity.details = orderLines;

        await this.orderRepository.save(orderEntity);

        await this.productVariantRepository.save(productVariantsUpdated);

        // delete cart lines
        const cartLineIds = cartLine.items.map((item) => item.cart_line_id);
        await this.cartLineRepository.delete(cartLineIds);
      }
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    category_id: Uuid,
    updateCategoryDto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    let categoryEntity = await this.orderRepository.findOne(category_id);

    if (!categoryEntity) {
      throw new NotFoundException();
    }

    categoryEntity = CategoryMapper.toUpdateEntity(
      categoryEntity,
      updateCategoryDto,
    );

    categoryEntity = await this.orderRepository.save(categoryEntity);

    return CategoryMapper.toDto(categoryEntity);
  }

  async softDelete(category_id: Uuid): Promise<boolean> {
    const deleteResponse = await this.orderRepository.softDelete(category_id);

    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }

    return true;
  }

  async restoreDeleted(id: Uuid): Promise<boolean> {
    const restoreResponse = await this.orderRepository.restore(id);
    if (!restoreResponse.affected) {
      throw new NotFoundException();
    }
    return true;
  }
}
