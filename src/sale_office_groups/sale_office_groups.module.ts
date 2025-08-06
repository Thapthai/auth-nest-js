import { Module } from '@nestjs/common';
import { SaleOfficeGroupsService } from './sale_office_groups.service';
import { SaleOfficeGroupsController } from './sale_office_groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SaleOfficeGroupsController],
  providers: [SaleOfficeGroupsService],
})
export class SaleOfficeGroupsModule {}
