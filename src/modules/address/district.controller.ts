import { UUIDParam } from '@/decorators/http.decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DistrictService } from './district.service';
import { DistrictResponseDto } from './dtos';

@ApiTags('Address')
@Controller('districts')
export class DistrictController {
  constructor(private districtService: DistrictService) {}

  @ApiOperation({ description: 'Get district list' })
  @Get('/:id/list')
  async getDistricts(
    @UUIDParam('id') provinceId: Uuid,
  ): Promise<DistrictResponseDto[]> {
    return this.districtService.getListById(provinceId);
  }
}
