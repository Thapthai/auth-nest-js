import { Module } from '@nestjs/common';
import { RoundTimeExpressService } from './round_time_express.service';
import { RoundTimeExpressController } from './round_time_express.controller';

@Module({
  controllers: [RoundTimeExpressController],
  providers: [RoundTimeExpressService],
})
export class RoundTimeExpressModule {}
