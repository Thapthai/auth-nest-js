import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from '../notification_socket/notification.module';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    NotificationModule,
  ]

})
export class NotificationsModule { }
