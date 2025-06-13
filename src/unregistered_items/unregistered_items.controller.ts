import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnregisteredItemsService } from './unregistered_items.service';
import { CreateUnregisteredItemDto } from './dto/create-unregistered_item.dto';
import { UpdateUnregisteredItemDto } from './dto/update-unregistered_item.dto';

@Controller('unregistered-items')
export class UnregisteredItemsController {
  constructor(private readonly unregisteredItemsService: UnregisteredItemsService) {}

  @Post()
  create(@Body() createUnregisteredItemDto: CreateUnregisteredItemDto) {
    return this.unregisteredItemsService.create(createUnregisteredItemDto);
  }

  @Get()
  findAll() {
    return this.unregisteredItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unregisteredItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnregisteredItemDto: UpdateUnregisteredItemDto) {
    return this.unregisteredItemsService.update(+id, updateUnregisteredItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unregisteredItemsService.remove(+id);
  }
}
