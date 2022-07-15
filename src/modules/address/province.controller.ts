import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProvinceResponseDto } from './dtos';
import { ProvinceService } from './province.service';

@ApiTags('Address')
@Controller('provinces')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @ApiOperation({ description: 'Get province list' })
  @Get()
  async getStores(): Promise<ProvinceResponseDto[]> {
    return this.provinceService.getList();
  }
}
