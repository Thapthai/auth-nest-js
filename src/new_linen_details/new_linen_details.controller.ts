import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateNewLinenDetailDto } from './dto/create-new_linen_detail.dto';
import { UpdateNewLinenDetailDto } from './dto/update-new_linen_detail.dto';
import { NewLinenDetailsService } from './new_linen_details.service';

@Controller('new-linen-details')
export class NewLinenDetailsController {
  constructor(private readonly service: NewLinenDetailsService) {}

  @Post()
  create(@Body() dto: CreateNewLinenDetailDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('new_linen_id') new_linen_id?: number) {
    return this.service.findAll(new_linen_id ? Number(new_linen_id) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewLinenDetailDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
