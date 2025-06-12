import { Module } from '@nestjs/common';
import { DirtyDetailsService } from './dirty_details.service';
import { DirtyDetailsController } from './dirty_details.controller';

@Module({
  controllers: [DirtyDetailsController],
  providers: [DirtyDetailsService],
})
export class DirtyDetailsModule {}
