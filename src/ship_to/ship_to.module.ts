import { Module } from '@nestjs/common';
import { ShipToService } from './ship_to.service';
import { ShipToController } from './ship_to.controller';

@Module({
  controllers: [ShipToController],
  providers: [ShipToService],
})
export class ShipToModule {}
