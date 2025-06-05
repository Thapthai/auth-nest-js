import { Injectable } from '@nestjs/common';
import { CreateTestServiceDto } from './dto/create-test-service.dto';
import { UpdateTestServiceDto } from './dto/update-test-service.dto';
import { NotificationGateway } from 'src/notification_socket/notification.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationGateway: NotificationGateway) { }

  async create(createTestServiceDto: CreateTestServiceDto) {

    try {
      const { user_id, title, message, type } = createTestServiceDto;

      const saveNotification = await this.prisma.notifications.create({
        data: {
          user_id: user_id,
          title: title,
          message: message,
          type: type,
        },
      });

      // ส่ง Notification ผ่าน Socket
      this.notificationGateway.sendNotification({
        message: saveNotification.message,
      });


    } catch (error) {

    }

  }

  async testNotifyToUser(userId: string, createTestServiceDto: CreateTestServiceDto) {
    try {
      const { user_id, title, message, type } = createTestServiceDto;

      const saveNotification = await this.prisma.notifications.create({
        data: {
         user_id: user_id,
          title: title,
          message: message,
          type: type,
        },
      });

      // ส่งไปยังห้องของ userId โดยเฉพาะ
      this.notificationGateway.sendNotificationToUser(userId, {
        message: saveNotification.message,
        title: saveNotification.title,
        type: saveNotification.type,
      });

      return { status: 'sent', to: userId };
    } catch (error) {
      console.error('ส่ง notification ไม่สำเร็จ:', error);
      throw new Error('Notification failed');
    }
  }



  findAll() {
    return `This action returns all testService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testService`;
  }

  update(id: number, updateTestServiceDto: UpdateTestServiceDto) {
    return `This action updates a #${id} testService`;
  }

  remove(id: number) {
    return `This action removes a #${id} testService`;
  }
}
