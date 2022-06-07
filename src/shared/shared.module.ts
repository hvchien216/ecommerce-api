import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [ApiConfigService, GeneratorService, ValidatorService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
