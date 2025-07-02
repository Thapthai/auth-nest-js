import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FindByuserIdDto } from './dto/findByuserId.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Post('send')
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.sendNotification(createNotificationDto);
  }

  @Post('send-to-user/:userId')
  async sendNotificationToUser(
    @Param('userId') userId: string,
    @Body() createNotificationDto: CreateNotificationDto
  ) {
    return this.notificationsService.sendNotificationToUser(+userId, createNotificationDto);
  }

  @Post('send-to-multiple-users')
  async sendNotificationToMultipleUsers(
    @Body() data: {
      userIds: number[];
      notification: CreateNotificationDto;
    }
  ) {
    return this.notificationsService.sendNotificationToMultipleUsers(data.userIds, data.notification);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user-notification/:id')
  findByuserId(@Param('id') id: string, @Query() findByuserIdDto: FindByuserIdDto) {
    return this.notificationsService.findByuserId(+id, findByuserIdDto);
  }

  @Patch('user-notification/:id')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markOneAsRead(+id);
  }

}
