import { Module } from '@nestjs/common';
import { DirtyDetailRoundsService } from './dirty_detail_rounds.service';
import { DirtyDetailRoundsController } from './dirty_detail_rounds.controller';

@Module({
  controllers: [DirtyDetailRoundsController],
  providers: [DirtyDetailRoundsService],
})
export class DirtyDetailRoundsModule {}
