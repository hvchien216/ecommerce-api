import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [
  ApiConfigService,
  GeneratorService,
  ValidatorService,
  AwsS3Service,
];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
