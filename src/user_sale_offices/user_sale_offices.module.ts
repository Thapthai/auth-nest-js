import { Module } from '@nestjs/common';
import { UserSaleOfficesService } from './user_sale_offices.service';
import { UserSaleOfficesController } from './user_sale_offices.controller';

@Module({
  controllers: [UserSaleOfficesController],
  providers: [UserSaleOfficesService],
})
export class UserSaleOfficesModule {}
