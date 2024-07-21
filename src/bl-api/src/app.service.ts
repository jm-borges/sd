import { Injectable } from '@nestjs/common';
import { PrizesService } from './prizes/prizes.service';

@Injectable()
export class AppService {
  constructor(private readonly prizesService: PrizesService) { }


}
