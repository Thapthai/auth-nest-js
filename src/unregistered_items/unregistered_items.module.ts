import { Module } from '@nestjs/common';
import { UnregisteredItemsService } from './unregistered_items.service';
import { UnregisteredItemsController } from './unregistered_items.controller';

@Module({
  controllers: [UnregisteredItemsController],
  providers: [UnregisteredItemsService],
})
export class UnregisteredItemsModule {}
