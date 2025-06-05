import { Module } from '@nestjs/common';
import { TestServiceService } from './test-service.service';
import { TestServiceController } from './test-service.controller';
import { NotificationModule } from 'src/notification_socket/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [TestServiceController],
  providers: [TestServiceService],
})
export class TestServiceModule { }
