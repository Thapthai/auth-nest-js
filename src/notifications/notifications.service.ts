import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByuserIdDto } from './dto/findByuserId.dto';
import { NotificationGateway } from '../notification_socket/notification.gateway';
import { count } from 'console';

@Injectable()
export class NotificationsService {

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private notificationGateway: NotificationGateway,
  ) { }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  async findByuserId(id: number, dto: FindByuserIdDto) {
    const skip = Number(dto.skip) || 0;
    const take = Number(dto.take) || 3;

    const notifications = await this.prisma.notifications.findMany({
      where: { user_id: id },
      orderBy: { create_at: 'desc' },
      skip: skip,
      take: take,
    });

    const total = await this.prisma.notifications.count({
      where: { user_id: id },
    });

    const unreadCount = await this.prisma.notifications.count({
      where: {
        user_id: id,
        is_read: false,
      },
    });

    return {
      notifications,
      count: notifications.length,
      unreadCount,
      total,
    };
  }

  async markOneAsRead(notificationId: number) {
    const updated = await this.prisma.notifications.update({
      where: { id: notificationId },
      data: { is_read: true },
    });

    return {
      message: `Notification ${notificationId} marked as read.`,
      updated,
    };
  }

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    try {
      // สร้างการแจ้งเตือนในฐานข้อมูล
      const notification = await this.prisma.notifications.create({
        data: {
          user_id: createNotificationDto.user_id || 1, // default user if not specified
          title: createNotificationDto.title,
          message: createNotificationDto.message,
          type: createNotificationDto.type,
          is_read: createNotificationDto.is_read || false,
        },
      });

      // ส่งการแจ้งเตือนผ่าน WebSocket
      this.notificationGateway.sendNotification(notification);

      return {
        message: 'Notification sent successfully',
        notification,
      };
    } catch (error) {
      throw new Error(`Failed to send notification: ${error.message}`);
    }
  }

  async sendNotificationToUser(userId: number, createNotificationDto: CreateNotificationDto) {
    try {
      // สร้างการแจ้งเตือนในฐานข้อมูล
      const notification = await this.prisma.notifications.create({
        data: {
          user_id: userId,
          title: createNotificationDto.title,
          message: createNotificationDto.message,
          type: createNotificationDto.type,
          is_read: createNotificationDto.is_read || false,
        },
      });
 
      

      // ส่งการแจ้งเตือนไปยังผู้ใช้เฉพาะผ่าน WebSocket
      this.notificationGateway.sendNotificationToUser(userId.toString(), notification);

      return {
        message: `Notification sent to user ${userId} successfully`,
        notification,
      };
    } catch (error) {
      throw new Error(`Failed to send notification to user: ${error.message}`);
    }
  }

  async sendNotificationToMultipleUsers(userIds: number[], createNotificationDto: CreateNotificationDto) {
    try {
      const notifications: any[] = [];

      // สร้างการแจ้งเตือนสำหรับแต่ละผู้ใช้
      for (const userId of userIds) {
        const notification = await this.prisma.notifications.create({
          data: {
            user_id: userId,
            title: createNotificationDto.title,
            message: createNotificationDto.message,
            type: createNotificationDto.type,
            is_read: createNotificationDto.is_read || false,
          },
        });

        // ส่งการแจ้งเตือนไปยังผู้ใช้แต่ละคน
        this.notificationGateway.sendNotificationToUser(userId.toString(), notification);
        notifications.push(notification);
      }

      return {
        message: `Notifications sent to ${userIds.length} users successfully`,
        notifications,
        count: notifications.length,
      };
    } catch (error) {
      throw new Error(`Failed to send notifications to multiple users: ${error.message}`);
    }
  }

}
