import { UUIDParam } from '@/decorators/http.decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WardResponseDto } from './dtos';
import { WardService } from './ward.service';

@ApiTags('Address')
@Controller('wards')
export class WardController {
  constructor(private wardService: WardService) {}

  @ApiOperation({ description: 'Get ward list' })
  @Get('/:id/list')
  async getWards(
    @UUIDParam('id') districtId: Uuid,
  ): Promise<WardResponseDto[]> {
    return this.wardService.getListById(districtId);
  }
}
