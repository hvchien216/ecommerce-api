import {
  StringFieldOptional,
  UUIDFieldOptional,
} from '@/decorators/field.decorators';

export class QueryProductsRequestDto {
  @StringFieldOptional({ swagger: true })
  q?: string;

  @UUIDFieldOptional({ each: true, swagger: true })
  category_ids?: Uuid[];

  @UUIDFieldOptional({ swagger: true })
  store_id?: Uuid;
}
