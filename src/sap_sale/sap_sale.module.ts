import { Module } from '@nestjs/common';
import { SapSaleService } from './sap_sale.service';
import { SapSaleController } from './sap_sale.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SapSaleController],
  providers: [SapSaleService, PrismaService],
})
export class SapSaleModule {}
