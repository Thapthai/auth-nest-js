import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3005',
      'http://10.11.9.43:3005'
    ],
    credentials: true
  }
})
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
