import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaterialTypesService } from './material_types.service';
import { CreateMaterialTypeDto } from './dto/create-material_type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material_type.dto';

@Controller('material-types')
export class MaterialTypesController {
  constructor(private readonly materialTypesService: MaterialTypesService) {}

  @Post()
  create(@Body() createMaterialTypeDto: CreateMaterialTypeDto) {
    return this.materialTypesService.create(createMaterialTypeDto);
  }

  @Get()
  findAll() {
    return this.materialTypesService.findAll();
  }

  @Get('pagination-with-search')
  findAllMaterialTypesPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('search') search = ''
  ) {
    return this.materialTypesService.findAllMaterialTypesPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      search: search.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialTypeDto: UpdateMaterialTypeDto) {
    return this.materialTypesService.update(+id, updateMaterialTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialTypesService.remove(+id);
  }
}
