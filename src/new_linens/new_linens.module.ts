import { Module } from '@nestjs/common';
import { NewLinensService } from './new_linens.service';
import { NewLinensController } from './new_linens.controller';

@Module({
  controllers: [NewLinensController],
  providers: [NewLinensService],
})
export class NewLinensModule {}
