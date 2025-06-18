import { Module } from '@nestjs/common';
import { FactorySaleOfficeService } from './factory_sale_office.service';
import { FactorySaleOfficeController } from './factory_sale_office.controller';

@Module({
  controllers: [FactorySaleOfficeController],
  providers: [FactorySaleOfficeService],
})
export class FactorySaleOfficeModule {}
