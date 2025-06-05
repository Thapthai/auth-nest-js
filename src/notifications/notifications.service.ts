import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByuserIdDto } from './dto/update-notification.dto copy';
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


  async findByuserId(id: number, findByuserIdDto: FindByuserIdDto) {
    const notifications = await this.prisma.notifications.findMany({
      where: { user_id: id },
      orderBy: { create_at: 'desc' }, // optional: เรียงจากใหม่ไปเก่า
      take: 9
    });

    return {
      notifications,
      count: notifications.length
    };
  }


  async markAsRead(userId: number) {
    const updated = await this.prisma.notifications.updateMany({
      where: {
        user_id: userId,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    return {
      message: `${updated.count} notification(s) marked as read.`,
    };
  }

}
