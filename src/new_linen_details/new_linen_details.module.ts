import { Module } from '@nestjs/common';
import { NewLinenDetailsService } from './new_linen_details.service';
import { NewLinenDetailsController } from './new_linen_details.controller';

@Module({
  controllers: [NewLinenDetailsController],
  providers: [NewLinenDetailsService],
})
export class NewLinenDetailsModule {}
