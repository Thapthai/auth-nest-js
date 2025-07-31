import { Module } from '@nestjs/common';
import { RoundTimeCleanService } from './round_time_clean.service';
import { RoundTimeCleanController } from './round_time_clean.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RoundTimeCleanController],
  providers: [RoundTimeCleanService, PrismaService],
})
export class RoundTimeCleanModule {}
