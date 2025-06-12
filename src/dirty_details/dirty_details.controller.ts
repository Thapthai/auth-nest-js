import { Controller, Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirtyDetailsService } from './dirty_details.service';
import { CreateDirtyDetailDto } from './dto/create-dirty_detail.dto';
import { UpdateDirtyDetailDto } from './dto/update-dirty_detail.dto';

@Controller('dirty-details')
export class DirtyDetailsController {
  constructor(private readonly dirtyDetailsService: DirtyDetailsService) { }

  @Post()
  create(@Body() createDirtyDetailDto: CreateDirtyDetailDto) {
    return this.dirtyDetailsService.create(createDirtyDetailDto);
  }

  @Get()
  findAll(@Query('dirty_id') dirtyIdParam?: string) {
    const dirty_id = dirtyIdParam ? parseInt(dirtyIdParam, 10) : undefined;
    return this.dirtyDetailsService.findAll(dirty_id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dirtyDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirtyDetailDto: UpdateDirtyDetailDto) {
    return this.dirtyDetailsService.update(+id, updateDirtyDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dirtyDetailsService.remove(+id);
  }
}
