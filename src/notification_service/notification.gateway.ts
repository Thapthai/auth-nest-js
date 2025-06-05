import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) { }

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // ==================================== Broadcast Notification ====================================
  sendNotification(data: any) {
    this.server.emit('new-notification', data);
  }

  // Function for sending specific notifications user 
  sendNotificationToUser(userId: string, data: any) {
    this.server.to(userId).emit('new-send-notification-user', data);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      client.join(userId);
    }
  }

}
