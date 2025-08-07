import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';

@Module({
  providers: [ExcelService],
  controllers: [ExcelController],
  exports: [ExcelService], // Export เพื่อให้ modules อื่นใช้ได้
})
export class ExcelModule {}