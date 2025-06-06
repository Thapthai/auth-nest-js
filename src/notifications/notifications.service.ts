import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByuserIdDto } from './dto/findByuserId.dto';
import { count } from 'console';

@Injectable()
export class NotificationsService {

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
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

}
