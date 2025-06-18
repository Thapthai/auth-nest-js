import { Module } from '@nestjs/common';
import { SaleOfficesService } from './sale_offices.service';
import { SaleOfficesController } from './sale_offices.controller';

@Module({
  controllers: [SaleOfficesController],
  providers: [SaleOfficesService],
})
export class SaleOfficesModule {}
