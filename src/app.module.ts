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
import { DirtyDetailRoundsModule } from './dirty_detail_rounds/dirty_detail_rounds.module';
import { SaleOfficesModule } from './sale_offices/sale_offices.module';
import { UserSaleOfficesModule } from './user_sale_offices/user_sale_offices.module';
import { FactorySaleOfficeModule } from './factory_sale_office/factory_sale_office.module';
import { UsersModule } from './users/users.module';
import { PermissionModule } from './permission/permission.module';
import { RoundTimeDirtiesModule } from './round_time_dirties/round_time_dirties.module';
import { RoundTimeExpressModule } from './round_time_express/round_time_express.module';
import { RoundTimeShelfCountExpressModule } from './round_time_shelf_count_express/round_time_shelf_count_express.module';
import { RoundTimeCleanModule } from './round_time_clean/round_time_clean.module';
import { RoundTimeFactoryModule } from './round_time_factory/round_time_factory.module';
import { ItemCategoryPricesModule } from './item_category_prices/item_category_prices.module';
import { ItemCategoriesModule } from './item_categories/item_categories.module';
import { MaterialTypesModule } from './material_types/material_types.module';
import { MaterialsModule } from './materials/materials.module';
import { SapSaleModule } from './sap_sale/sap_sale.module';
import { StockLocationsModule } from './stock_locations/stock_locations.module';
import { LocationsModule } from './locations/locations.module';
import { SaleOfficeGroupsModule } from './sale_office_groups/sale_office_groups.module';
import { SaleOfficeGroupTypesModule } from './sale_office_group_types/sale_office_group_types.module';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    PrismaModule,
    AuthenticationModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
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
    DirtyDetailRoundsModule,
    SaleOfficesModule,
    UserSaleOfficesModule,
    FactorySaleOfficeModule,
    UsersModule,
    PermissionModule,
    RoundTimeDirtiesModule,
    RoundTimeExpressModule,
    RoundTimeShelfCountExpressModule,
    RoundTimeCleanModule,
    RoundTimeFactoryModule,
    ItemCategoryPricesModule,
    ItemCategoriesModule,
    MaterialTypesModule,
    MaterialsModule,
    SapSaleModule,
    StockLocationsModule,
    LocationsModule,
    SaleOfficeGroupsModule,
    SaleOfficeGroupTypesModule,
    ExcelModule,
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
