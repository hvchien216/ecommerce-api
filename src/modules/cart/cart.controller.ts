import { RoleType } from '@/constants/role-type';
import { AuthUser } from '@/decorators/auth-user.decorator';
import { Auth } from '@/decorators/http.decorators';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { CartService } from './cart.service';
import { AddToCartRequestDto, UpdateCartRequestDto } from './dtos';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOperation({ description: 'update cart' })
  @Post('/update')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async updateCart(
    @AuthUser() currentUser: UserEntity,
    @Body(ValidationPipe)
    updateCartDto: UpdateCartRequestDto,
  ): Promise<any> {
    return this.cartService.update(currentUser, updateCartDto);
  }

  @ApiOperation({ description: 'add to cart' })
  @Post('/add-to-cart')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async addToCart(
    @AuthUser() currentUser: UserEntity,
    @Body(ValidationPipe)
    addToCartDto: AddToCartRequestDto,
  ): Promise<any> {
    return this.cartService.addToCart(currentUser, addToCartDto);
  }

  @ApiOperation({ description: 'get cart by user' })
  @Get('/get')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async getCartByUser(@AuthUser() currentUser: UserEntity): Promise<any> {
    return this.cartService.getCart(currentUser);
  }
}
