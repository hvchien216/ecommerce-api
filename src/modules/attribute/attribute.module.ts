import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeController } from './attribute.controller';
import { AttributeEntity } from './attribute.entity';
import { AttributeService } from './attribute.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeEntity])],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
