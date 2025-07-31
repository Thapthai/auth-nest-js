import { Module } from '@nestjs/common';
import { RoundTimeFactoryService } from './round_time_factory.service';
import { RoundTimeFactoryController } from './round_time_factory.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RoundTimeFactoryController],
  providers: [RoundTimeFactoryService, PrismaService],
})
export class RoundTimeFactoryModule {}
