import { Module } from '@nestjs/common';
import { CustomerGroupsService } from './customer_groups.service';
import { CustomerGroupsController } from './customer_groups.controller';

@Module({
  controllers: [CustomerGroupsController],
  providers: [CustomerGroupsService],
})
export class CustomerGroupsModule {}
