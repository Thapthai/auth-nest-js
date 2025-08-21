import { Module } from '@nestjs/common';
import { ShipTosService } from './ship_tos.service';
import { ShipTosController } from './ship_tos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShipTosController],
  providers: [ShipTosService],
})
export class ShipTosModule {}
