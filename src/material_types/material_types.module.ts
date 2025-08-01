import { Module } from '@nestjs/common';
import { MaterialTypesService } from './material_types.service';
import { MaterialTypesController } from './material_types.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MaterialTypesController],
  providers: [MaterialTypesService, PrismaService],
})
export class MaterialTypesModule {}
