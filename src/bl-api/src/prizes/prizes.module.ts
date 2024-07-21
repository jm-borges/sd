import { Module } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { PrizesController } from './prizes.controller';

@Module({
  providers: [PrizesService],
  controllers: [PrizesController],
  exports: [PrizesService],
})
export class PrizesModule { }
