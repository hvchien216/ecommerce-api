import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty } from 'class-validator';

export class LinkEmployeeToStoreRequestDto {
  @ApiProperty()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  readonly employeesId: Uuid[];
}
