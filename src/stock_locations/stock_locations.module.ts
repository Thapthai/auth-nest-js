import { Module } from '@nestjs/common';
import { StockLocationsService } from './stock_locations.service';
import { StockLocationsController } from './stock_locations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StockLocationsController],
  providers: [StockLocationsService, PrismaService],
})
export class StockLocationsModule {}
