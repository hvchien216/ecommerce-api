import { ApiProperty } from '@nestjs/swagger';

import { CartLinesCreateOrderDto } from './cart-lines-create-order.dto';

export class CreateOrderRequestDto {
  // NOTED
  @ApiProperty({
    isArray: true,
    type: CartLinesCreateOrderDto,
  })
  cart: CartLinesCreateOrderDto[];
}
