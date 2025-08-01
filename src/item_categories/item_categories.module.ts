import { Module } from '@nestjs/common';
import { ItemCategoriesService } from './item_categories.service';
import { ItemCategoriesController } from './item_categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemCategoriesController],
  providers: [ItemCategoriesService, PrismaService],
})
export class ItemCategoriesModule {}
