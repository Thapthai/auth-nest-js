import { Module } from '@nestjs/common';
import { RoundTimeShelfCountExpressService } from './round_time_shelf_count_express.service';
import { RoundTimeShelfCountExpressController } from './round_time_shelf_count_express.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RoundTimeShelfCountExpressController],
  providers: [RoundTimeShelfCountExpressService, PrismaService],
})
export class RoundTimeShelfCountExpressModule {}
