import { Module } from '@nestjs/common';
import { RoundTimeDirtiesService } from './round_time_dirties.service';
import { RoundTimeDirtiesController } from './round_time_dirties.controller';

@Module({
  controllers: [RoundTimeDirtiesController],
  providers: [RoundTimeDirtiesService],
})
export class RoundTimeDirtiesModule {}
