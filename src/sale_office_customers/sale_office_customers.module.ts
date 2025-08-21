import { Module } from '@nestjs/common';
import { SaleOfficeCustomersService } from './sale_office_customers.service';
import { SaleOfficeCustomersController } from './sale_office_customers.controller';

@Module({
  controllers: [SaleOfficeCustomersController],
  providers: [SaleOfficeCustomersService],
})
export class SaleOfficeCustomersModule {}
