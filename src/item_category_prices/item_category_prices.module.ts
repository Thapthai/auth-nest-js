import { Module } from '@nestjs/common';
import { ItemCategoryPricesService } from './item_category_prices.service';
import { ItemCategoryPricesController } from './item_category_prices.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemCategoryPricesController],
  providers: [ItemCategoryPricesService, PrismaService],
})
export class ItemCategoryPricesModule {}
