import { Module } from '@nestjs/common';
import { SaleOfficeGroupTypesService } from './sale_office_group_types.service';
import { SaleOfficeGroupTypesController } from './sale_office_group_types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SaleOfficeGroupTypesController],
  providers: [SaleOfficeGroupTypesService],
})
export class SaleOfficeGroupTypesModule {}
