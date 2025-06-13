import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { NotificationModule } from './notification_socket/notification.module';
import { TestServiceModule } from './test-service/test-service.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DirtiesModule } from './dirties/dirties.module';
import { DepartmentsModule } from './departments/departments.module';
import { DirtyDetailsModule } from './dirty_details/dirty_details.module';
import { FactoriesModule } from './factories/factories.module';
import { ItemsModule } from './items/items.module';
import { NewLinensModule } from './new_linens/new_linens.module';
import { NewLinenDetailsModule } from './new_linen_details/new_linen_details.module';
import { UnregisteredItemsModule } from './unregistered_items/unregistered_items.module';

@Module({
  imports: [
    PrismaModule,
    AuthenticationModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    NotificationModule,
    TestServiceModule,
    NotificationsModule,
    DirtiesModule,
    DepartmentsModule,
    DirtyDetailsModule,
    FactoriesModule,
    ItemsModule,
    NewLinensModule,
    NewLinenDetailsModule,
    UnregisteredItemsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
