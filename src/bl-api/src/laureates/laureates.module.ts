import { Module } from '@nestjs/common';
import { LaureatesService } from './laureates.service';
import { LaureatesController } from './laureates.controller';

@Module({
  providers: [LaureatesService],
  controllers: [LaureatesController]
})
export class LaureatesModule { }
