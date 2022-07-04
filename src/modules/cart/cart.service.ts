import { Helpers } from '@/utils/helpers';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductsRepository } from '../product/product.repository';
import { StoreEntity } from '../store/store.entity';
import { UserEntity } from '../user/user.entity';
import { CartLineEntity } from './cart-line.entity';
import { CartMapper } from './cart.mapper';
import { AddToCartRequestDto, UpdateCartRequestDto } from './dtos';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartLineEntity)
    private cartLineRepository: Repository<CartLineEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductVariantEntity)
    private pVariantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    @Inject('ProductsRepository')
    private productRepository: ProductsRepository,
    private helpers: Helpers,
  ) {}

  async addToCart(
    currentUser: UserEntity,
    { store_id, product_id, product_variant_id, quantity }: AddToCartRequestDto,
  ): Promise<any> {
    const cartLineEntityMatch = await this.cartLineRepository.findOne({
      product_id,
      store_id,
      product_variant_id,
    });

    if (cartLineEntityMatch) {
      cartLineEntityMatch.quantity += quantity;
      await this.cartLineRepository.save(cartLineEntityMatch);
    } else {
      const createCartLineDto = {
        product_id,
        product_variant_id,
        store_id,
        user_id: currentUser.id,
        quantity,
      };
      const cartLineEntity = CartMapper.toCreateEntity(createCartLineDto);
      await this.cartLineRepository.save(cartLineEntity);
    }
    return;
  }

  async getCart(currentUser: UserEntity): Promise<any> {
    const cartLineEntities = await this.cartLineRepository.find({
      where: {
        user_id: currentUser.id,
      },
      relations: [
        'product',
        'product.variants',
        'product.storeOwner',
        'store',
        'product_variant',
      ],
    });

    const cartLinesGroupByStore = this.helpers.groupBy(
      cartLineEntities,
      'store_id',
    );

    console.log('cartLineEntities===>', cartLineEntities.length);

    const response = Object.values(cartLinesGroupByStore).reduce(
      (result: any[], cartLines: CartLineEntity[]) => {
        const cartLineItem = {
          shop: cartLines[0].store,
          items: [],
        };

        for (const cartLine of cartLines) {
          const item = {
            ...cartLine.product,
            quantity: cartLine.quantity,
            variant_id: cartLine.product_variant.id,
            variant_name: cartLine.product_variant.name,
            price: cartLine.product_variant.price,
            cart_line_id: cartLine.id,
          };

          cartLineItem.items.push(item);
        }

        return result.concat(cartLineItem);
      },
      [],
    );
    return response;
  }

  async update(
    currentUser: UserEntity,
    updateCartDto: UpdateCartRequestDto,
  ): Promise<any> {
    //case: Validate
    const {
      action_type,
      cart_line_id,
      store_id,
      product_id,
      product_variant_id,
    } = updateCartDto;
    const productVariantEntity = await this.pVariantRepository.findOne({
      where: {
        id: product_variant_id,
      },
      relations: ['product', 'product.variants', 'product.storeOwner'],
    });
    console.log('productVariantEntity===>', productVariantEntity);

    if (!productVariantEntity) {
      throw new HttpException(
        { message: 'Product variant not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isProductMatch = productVariantEntity.product.id === product_id;

    if (!isProductMatch) {
      throw new HttpException(
        { message: 'Product not match' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isStoreMatch =
      productVariantEntity.product.storeOwner.id === store_id;

    if (!isStoreMatch) {
      throw new HttpException(
        { message: 'Store not match' },
        HttpStatus.BAD_REQUEST,
      );
    }

    switch (action_type) {
      case 1: //UPDATE
        await this.updateCartLine(currentUser, updateCartDto);
        break;
      case 2: //DELETE
        await this.deleteCartLineById(cart_line_id);
        break;
      default:
        break;
    }
  }

  // check case nếu quantity của 1 variant đag có quantity > stock
  private async updateCartLine(
    currentUser: UserEntity,
    {
      cart_line_id,
      store_id,
      product_id,
      product_variant_id,
      old_product_variant_id,
      quantity,
    }: UpdateCartRequestDto,
  ): Promise<void> {
    // get cart line existed
    const cartLineEntityMatch = await this.cartLineRepository.findOne({
      product_id,
      store_id,
      product_variant_id,
    });
    //case: change model
    if (old_product_variant_id) {
      const oldCartLineEntityMatch = await this.cartLineRepository.findOne({
        product_id,
        store_id,
        product_variant_id: old_product_variant_id,
      });
      // case: thay đổi sang 1 variant khác mà đã tồn tại trong cart
      // thì cộng dồn qty của old vào qty của entity cart line đã tồn tại
      // và xoá đi cart-line cũ
      if (cartLineEntityMatch) {
        cartLineEntityMatch.quantity += oldCartLineEntityMatch.quantity; // or cartLineEntityMatch.quantity += quantity: vì 2 quantity này là 1
        await this.cartLineRepository.save(cartLineEntityMatch);

        //delete old_product_variant_id in cart line
        await this.cartLineRepository.delete(cart_line_id);
        return;
      }

      //case: thay đổi sang 1 variant khác mà chưa tồn tại trong cart
      oldCartLineEntityMatch.product_variant_id = product_variant_id;
      await this.cartLineRepository.save(oldCartLineEntityMatch);

      return;
    }

    //case: common (increment | decrease quantity)
    if (cartLineEntityMatch) {
      cartLineEntityMatch.quantity += quantity;
      await this.cartLineRepository.save(cartLineEntityMatch);
    } else {
      const createCartLineDto = {
        product_id,
        product_variant_id,
        store_id,
        user_id: currentUser.id,
        quantity,
      };
      const cartLineEntity = CartMapper.toCreateEntity(createCartLineDto);
      await this.cartLineRepository.save(cartLineEntity);
    }
    return;
  }

  private async deleteCartLineById(cartLineId: Uuid): Promise<boolean> {
    const responseDeleted = await this.cartLineRepository.delete(cartLineId);

    if (!responseDeleted.affected) {
      throw new NotFoundException();
    }

    return true;
  }

  // async getCartOrCreate(currentUser: UserEntity): Promise<CartEntity> {
  //   let cartEntity = await this.cartRepository.findOne();

  //   if (!cartEntity) {
  //     cartEntity = new CartEntity();

  //     cartEntity.owner = currentUser;

  //     cartEntity = await this.cartRepository.save(cartEntity);
  //   }
  //   console.log('cartEntity===>', cartEntity);

  //   return cartEntity;
  // }
}

//Update case (tang-giam quantity)
//Request URL: https://shopee.vn/api/v4/cart/add_to_cart
// Payload: {
//     "quantity": 5,
//     "checkout": true,
//     "update_checkout_only": false,
//     "donot_add_quantity": false,
//     "source": "{\"refer_urls\":[]}",
//     "add_on_deal_id": 9184098,
//     "client_source": 1,
//     "shopid": 59596762,
//     "itemid": 9335244556,
//     "modelid": 81318454985
// }

// Request URL: https://shopee.vn/api/v4/cart/update
//  Payload {
//     "action_type": 1,
//     "updated_shop_order_ids": [
//         {
//             "shopid": 59596762,
//             "item_briefs": [
//                 {
//                     "shopid": 59596762,
//                     "itemid": 9335244556,
//                     "modelid": 81318454985,
//                     "item_group_id": "4555973170366824307",
//                     "add_on_deal_id": 9184098,
//                     "is_add_on_sub_item": false,
//                     "quantity": 6,
//                     "old_modelid": null,
//                     "old_quantity": 5,
//                     "checkout": false,
//                     "applied_promotion_id": 1333963258,
//                     "price": 29900000000
//                 }
//             ]
//         }
//     ],
//     "selected_shop_order_ids": [
//         {
//             "shopid": 59596762,
//             "item_briefs": [],
//             "addin_time": 1656673807,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 342727995,
//             "item_briefs": [],
//             "addin_time": 1656657164,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 169058295,
//             "item_briefs": [],
//             "addin_time": 1656571885,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 52679373,
//             "item_briefs": [],
//             "addin_time": 1656037803,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 2921062,
//             "item_briefs": [],
//             "addin_time": 1655524843,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 239358464,
//             "item_briefs": [],
//             "addin_time": 1654751693,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 459159301,
//             "item_briefs": [],
//             "addin_time": 1654484770,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 193849872,
//             "item_briefs": [],
//             "addin_time": 1654426613,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 160102626,
//             "item_briefs": [],
//             "addin_time": 1654338920,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 212004800,
//             "item_briefs": [],
//             "addin_time": 1654331765,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 127217331,
//             "item_briefs": [],
//             "addin_time": 1654233712,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 390510989,
//             "item_briefs": [],
//             "addin_time": 1654167477,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 225909574,
//             "item_briefs": [],
//             "addin_time": 1654167378,
//             "auto_apply": true,
//             "shop_vouchers": []
//         },
//         {
//             "shopid": 182103376,
//             "item_briefs": [],
//             "addin_time": 1653999621,
//             "auto_apply": true,
//             "shop_vouchers": []
//         }
//     ],
//     "promotion_data": {
//         "use_coins": false,
//         "platform_vouchers": [],
//         "free_shipping_voucher_info": null,
//         "auto_apply_platform_voucher": true
//     },
//     "add_on_deal_sub_item_list": [
//         {
//             "add_on_deal_id": 9184098,
//             "item_group_id": "4555973170366824307",
//             "sub_item_list": []
//         }
//     ],
//     "version": 3
// }

// case chuyen variant da ton tai
// Request URL: https://shopee.vn/api/v4/cart/update
// Payload {
//   "action_type": 3,
//   "updated_shop_order_ids": [
//       {
//           "shopid": 59596762,
//           "item_briefs": [
//               {
//                   "shopid": 59596762,
//                   "itemid": 9335244556,
//                   "modelid": 81318454986,
//                   "item_group_id": "4555973170366824307",
//                   "add_on_deal_id": 9184098,
//                   "is_add_on_sub_item": false,
//                   "quantity": 6,
//                   "old_modelid": 81318454985,
//                   "old_quantity": 6,
//                   "checkout": false,
//                   "applied_promotion_id": 1333963258,
//                   "price": 29900000000
//               }
//           ]
//       }
//   ],
//   "selected_shop_order_ids": [
//       {
//           "shopid": 59596762,
//           "item_briefs": [],
//           "addin_time": 1656673807,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 342727995,
//           "item_briefs": [],
//           "addin_time": 1656657164,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 169058295,
//           "item_briefs": [],
//           "addin_time": 1656571885,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 52679373,
//           "item_briefs": [],
//           "addin_time": 1656037803,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 2921062,
//           "item_briefs": [],
//           "addin_time": 1655524843,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 239358464,
//           "item_briefs": [],
//           "addin_time": 1654751693,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 459159301,
//           "item_briefs": [],
//           "addin_time": 1654484770,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 193849872,
//           "item_briefs": [],
//           "addin_time": 1654426613,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 160102626,
//           "item_briefs": [],
//           "addin_time": 1654338920,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 212004800,
//           "item_briefs": [],
//           "addin_time": 1654331765,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 127217331,
//           "item_briefs": [],
//           "addin_time": 1654233712,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 390510989,
//           "item_briefs": [],
//           "addin_time": 1654167477,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 225909574,
//           "item_briefs": [],
//           "addin_time": 1654167378,
//           "auto_apply": true,
//           "shop_vouchers": []
//       },
//       {
//           "shopid": 182103376,
//           "item_briefs": [],
//           "addin_time": 1653999621,
//           "auto_apply": true,
//           "shop_vouchers": []
//       }
//   ],
//   "promotion_data": {
//       "use_coins": false,
//       "platform_vouchers": [],
//       "free_shipping_voucher_info": null,
//       "auto_apply_platform_voucher": true
//   },
//   "add_on_deal_sub_item_list": [
//       {
//           "add_on_deal_id": 9184098,
//           "item_group_id": "4555973170366824307",
//           "sub_item_list": []
//       }
//   ],
//   "version": 3
// }
