import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(
    @Query('department_id') departmentIdParam?: string,
    @Query('with_out_id') withOutIdParam?: string,
  ) {
    const department_id = departmentIdParam ? parseInt(departmentIdParam, 10) : undefined;
    const with_out_id = withOutIdParam
      ? withOutIdParam.split(',').map((id) => parseInt(id, 10)).filter((n) => !isNaN(n))
      : undefined;

    return this.itemsService.findAll(department_id, with_out_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
